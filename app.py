from flask import Flask, render_template, request, jsonify,redirect, url_for
from flask_cors import CORS
from sentence_transformers import SentenceTransformer, util
import csv
import subprocess
from pymongo import MongoClient
from bson.binary import Binary
import hashlib
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import pandas as pd


app = Flask(__name__)
CORS(app)

from dotenv import load_dotenv
import os
load_dotenv()
# Get the MongoDB URI from dotenv
mongo_uri = os.getenv('MONGO_URI')

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client['sentiment_analysis']
collection = db['analysis_results']

# Get the API keys from dotenv
api_key_genai = os.getenv('API_KEY_GENAI')
api_key_youtube = os.getenv('API_KEY_YOUTUBE')



import google.generativeai as genai
job_postings_df = pd.read_csv('job_postings.csv')



def generate_gemini_content_linkedin(description,clubbed_description):
# Configure Google Gemini API
    genai.configure(api_key=api_key_genai)

    # Prompt for summarization
    prompt = """You are supposed to use the a main job description = """
    model = genai.GenerativeModel("gemini-pro")
    rest=""" and also i give you a clubbed job description of similar job decriptions give me overall summary 300 words of how these are similar to main job description. the clubbed job description are="""
    response = model.generate_content(prompt + description + rest + clubbed_description)
    
    return response.text


def generate_gemini_content_amazon(positive,negative):
# Configure Google Gemini API
    genai.configure(api_key=api_key_genai)

    # Prompt for summarization
    prompt = """You are Amazon Customer Review summarizer i have clubbed amazon positive reviews and negative reviews in two different strings. You will be taking two different strings positive and negative
    and provide key summary of the positive string and negative string within 300 words separately. Please provide the summary of the positive string = """
    model = genai.GenerativeModel("gemini-pro")
    rest=""" and negative strings = """
    restt=""" provide answer in the form of two paragraphs with paragraph heading as POSITIVE REVIEW SUMMARIZATION and NEGATIVE REVIEW SUMMARIZATION both paragraphs should be a empty line separated"""
    response = model.generate_content(prompt + positive + rest + negative+restt)
    
    return response.text





# Function to generate summary using Google Gemini API
def generate_gemini_content_youtube(positive,negative):
# Configure Google Gemini API
    genai.configure(api_key=api_key_genai)

    # Prompt for summarization
    prompt = """You are YouTube video's comment summarizer i have clubbed youtube positive comments and negative comment in two string positive and negative respectively positive= """
    model = genai.GenerativeModel("gemini-pro")
    rest=""" negative= """
    restt=""" now provide me two paragraphs of 250 words each with Heading POSTIVE COMMENTS SUMMARIZATION and NEGATIVE COMMENTS SUMMARIZATION """
    response = model.generate_content(prompt + positive + rest +negative + restt)
    
    return response.text



# Initialize Sentence-BERT model
model = SentenceTransformer('distilbert-base-nli-mean-tokens')

# Load FAQ data from CSV
def load_faq_data():
    faq_data = {}
    with open('FAQs.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header row
        for row in reader:
            faq_data[row[0].lower()] = row[1]
    return faq_data

# Preprocess text
def preprocess_text(text):
    return text.lower()

# Retrieve answer from FAQ database using semantic similarity and keyword matching
def get_faq_answer(user_query, faq_data):
    user_query = preprocess_text(user_query)
    
    max_similarity = -1.0
    best_match = None
    
    for faq_question, faq_answer in faq_data.items():
        faq_question = preprocess_text(faq_question)
        
        # Calculate semantic similarity
        user_embedding = model.encode([user_query])[0]
        faq_embedding = model.encode([faq_question])[0]
        
        similarity = util.pytorch_cos_sim([user_embedding], [faq_embedding]).item()
        
        # Keyword matching
        keywords = set(faq_question.split())
        user_keywords = set(user_query.split())
        
        if len(user_keywords.intersection(keywords)) > 0:
            similarity += 0.5
        
        if similarity > max_similarity:
            max_similarity = similarity
            best_match = faq_answer
    
    return best_match

import pandas as pd
from googleapiclient.discovery import build
import re
import matplotlib.pyplot as plt
import seaborn as sns
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import requests
from bs4 import BeautifulSoup
import io
from bson.binary import Binary

def analyze_youtube_sentiment(youtube_link, api_key):
    print("youtbe ",youtube_link," api key",api_key)
    
    def extract_video_id(youtube_link):
        # Regular expression to extract the video ID from YouTube link
        match = re.match(r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})', youtube_link)
        if match:
            return match.group(1)
        else:
            return None

    def fetch_comments(video_id, api_key):
        youtube = build('youtube', 'v3', developerKey=api_key)
        try:
            # Fetch comments from YouTube video
            request = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                maxResults=100  # You can change this number as needed
            )
            comments = []
            while request:
                response = request.execute()
                for item in response["items"]:
                    comment = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
                    comments.append(comment)
                request = youtube.commentThreads().list_next(request, response)
                # Fetch video title
                video_request = youtube.videos().list(
                    part="snippet",
                    id=video_id
                )
                video_response = video_request.execute()
                video_title = video_response["items"][0]["snippet"]["title"]
            return comments,video_title
        except Exception as e:
            print(f"Failed to fetch comments: {e}")
            return None

    # Extract video ID
    youtube_video_id = extract_video_id(youtube_link)

    # Fetch comments
    comments,video_title = fetch_comments(youtube_video_id, api_key)
    
    if comments is None:
        print("failed extracting comments")
        return None
    print("successfully extracted comments")
    print("video_title=",video_title)
    # Create DataFrame
    df = pd.DataFrame(comments, columns=["Comment"])

    # Load the tokenizer and model for sentiment analysis
    tokenizer = AutoTokenizer.from_pretrained('cardiffnlp/twitter-roberta-base-sentiment')
    model = AutoModelForSequenceClassification.from_pretrained('cardiffnlp/twitter-roberta-base-sentiment')
    print("model imported successfully")
    # Define a function to encode the text and get sentiment
    def get_sentiment(text):
        try:
            # Add max_length parameter to tokenizer
            encoded_input = tokenizer(text, truncation=True, padding=True, return_tensors='pt', max_length=128)
            output = model(**encoded_input)
            sentiment = torch.argmax(output.logits, dim=-1)
            print("Sentiment analysed for chunk of comments .")
            return sentiment.item()
        except Exception as e:
            print("Error during sentiment analysis:", e)
            return None

    # Apply sentiment analysis to comments
    df['Sentiment'] = df['Comment'].apply(get_sentiment)
    print("done sentiment analysis")

    # Map sentiment labels
    sentiment_map = {0: 'Negative', 1: 'Neutral', 2: 'Positive'}
    df['Sentiment'] = df['Sentiment'].map(sentiment_map)
    # Extract positive and negative comments
    positive_comments = df[df['Sentiment'] == 'Positive']['Comment'].tolist()
    negative_comments = df[df['Sentiment'] == 'Negative']['Comment'].tolist()

    # Combine positive and negative comments into strings
    positive = "\n".join(positive_comments)
    negative = "\n".join(negative_comments)

    summary=generate_gemini_content_youtube(positive,negative)
    print("summary created = ",summary)
    
    # Generate sentiment distribution
    sentiment_counts = df['Sentiment'].value_counts()

    # Define color palette
    colors = sns.color_palette("coolwarm")

    # Create subplots
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    # Pie chart
    sizes = sentiment_counts.values
    labels = sentiment_counts.index
    explode = (0, 0, 0)
    ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%', startangle=140)
    ax1.set_title('Sentiment Distribution (Pie Chart)')

    # Bar plot
    sns.countplot(data=df, x='Sentiment', palette='coolwarm', ax=ax2)
    ax2.set_title('Sentiment Distribution (Bar Plot)')
    ax2.set_xlabel('Sentiment')
    ax2.set_ylabel('Count')

    # # Show plot
    # plt.tight_layout()
    # plt.show()
    plot_data = io.BytesIO()
    plt.savefig(plot_data, format='png')
    plot_data.seek(0)
    image_binary = Binary(plot_data.read())
    print("converted in binary result=",image_binary)
    return image_binary,summary,video_title


# AMAZON CUSTOMER REVIEW SENTIMENT ANALYSIS
import requests
import pandas as pd
from bs4 import BeautifulSoup
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import matplotlib.pyplot as plt
import seaborn as sns

def analyze_amazon_product_reviews(product_url):
    # Load the tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained('cardiffnlp/twitter-roberta-base-sentiment')
    model = AutoModelForSequenceClassification.from_pretrained('cardiffnlp/twitter-roberta-base-sentiment')
    print("successfully imported model")

    # Define a function to encode the text and get sentiment
    def get_sentiment(text):
        
        try:
            # Add max_length parameter to tokenizer
            encoded_input = tokenizer(text, truncation=True, padding=True, return_tensors='pt', max_length=128)  # Adjust max_length as needed
            output = model(**encoded_input)
            sentiment = torch.argmax(output.logits, dim=-1)
            print("Sentiment analyzed for chunk of reviews..")
            return sentiment.item()
        except Exception as e:
            print("Error during sentiment analysis:", e)
            return None

    # Map the sentiment scores to sentiment labels
    sentiment_labels = {0: 'negative', 1: 'neutral', 2: 'positive'}

    reviewlist = []

    def extract_reviews(review_url, page_number):
        resp = requests.get(review_url)
        soup = BeautifulSoup(resp.text, 'html.parser')
        reviews = soup.findAll('div', {'data-hook':"review"})
        for item in reviews:
            review = {
                'productTitle': soup.title.text.replace("Amazon.in:Customer reviews: ", "").strip(),
                'Review Title': item.find('a', {'data-hook':"review-title"}).text.strip(),
                'Rating': item.find('i', {'data-hook': 'review-star-rating'}).text.strip(),
                'Review Body': item.find('span', {'data-hook': 'review-body'}).text.strip() ,
            }
            reviewlist.append(review)  

    def total_pages(product_url):
        resp = requests.get(product_url)
        soup = BeautifulSoup(resp.text, 'html.parser')
        reviews = soup.find('div', {'data-hook':"cr-filter-info-review-rating-count"})
        return int(reviews.text.strip().split(', ')[1].split(" ")[0])

    # Extracting reviews
    review_url = product_url.replace("dp", "product-reviews") + "?pageNumber=" + str(1)
    total_pages = total_pages(review_url)
    print(total_pages)

    for i in range(total_pages//10):
        try: 
            review_url = product_url.replace("dp", "product-reviews") + "?pageNumber=" + str(i)

            extract_reviews(review_url, i)
            print("successfully extracted reviews")
        except Exception as e:
            print(e)
            break

    # Create DataFrame with reviews
    df = pd.DataFrame(reviewlist)
    
    # Perform sentiment analysis
    batch_size = 100  # Adjust batch size as needed
    sentiments = []
    for i in range(0, len(df), batch_size):
        batch = df['Review Body'][i:i+batch_size]
        sentiment_batch = [get_sentiment(text) for text in batch]
        sentiment_batch = [sentiment_labels[s] for s in sentiment_batch]
        sentiments.extend(sentiment_batch)

    df['sentiment_model'] = sentiments
    print("done sentiment analysis")


    positive = ""
    negative = ""

    for index, row in df.iterrows():
        if row['sentiment_model'] == 'positive':
            positive += row['Comment'] + "\n"
        elif row['sentiment_model'] == 'negative':
            negative += row['Comment'] + "\n"

    # Print or use the positive and negative strings
    print("Positive Comments:")
    print(positive)

    print("\nNegative Comments:")
    print(negative)
    summary=generate_gemini_content_amazon(positive,negative)
    print("summary created = ",summary)
    # Count the number of each sentiment label
    sentiment_counts = df['sentiment_model'].value_counts()

    # Set the style of the seaborn plot
    sns.set_style("whitegrid")
    # Create subplots
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
    print('plotting')
    # Pie chart
    sizes = sentiment_counts.values
    labels = sentiment_counts.index
    print("uptill here ")
    explode = (0, 0, 0)
    ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%', startangle=140)
    ax1.set_title('Sentiment Distribution (Pie Chart)')
    print('piechart plotted')
    # Bar plot
    sns.countplot(data=df, x='sentiment_model', palette='coolwarm', ax=ax2)
    ax2.set_title('Sentiment Distribution (Bar Plot)')
    ax2.set_xlabel('Sentiment')
    ax2.set_ylabel('Count')
    ax2.set_xticks([0, 1, 2])
    ax2.set_xticklabels(sentiment_counts.index)

    # Show plot
    # plt.tight_layout()
    # plt.show()
    print("pie chart and bar chart created")
    plot_data = io.BytesIO()
    plt.savefig(plot_data, format='png')
    plot_data.seek(0)
    image_binary = Binary(plot_data.read())
    print("converted amazon review sentiment analysis plots in binary result=",image_binary)
    return image_binary,summary


#LINKEDIN JOB POST ANALYSIS
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt

def find_similar_job_postings(linkedin_url):
    # Preprocess text function
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()

    def preprocess_text(text):
        # Remove HTML tags and non-alphanumeric characters
        text = re.sub('<.*?>', '', text)
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)

        # Tokenize the text
        tokens = word_tokenize(text)

        # Convert tokens to lowercase and remove stopwords
        tokens = [token.lower() for token in tokens if token.lower() not in stop_words]

        # Lemmatize tokens
        tokens = [lemmatizer.lemmatize(token) for token in tokens]

        return ' '.join(tokens)

    # Scrape job details from the LinkedIn URL
    def scrape_linkedin_job_post(linkedin_url):
        try:
            # Send a GET request to the LinkedIn URL
            response = requests.get(linkedin_url)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the HTML content of the page
                soup = BeautifulSoup(response.content, 'html.parser')

                # Extract job details
                job_title = soup.find('h1', {'class': 'topcard__title'}).text.strip()
                company_name = soup.find('a', {'class': 'topcard__org-name-link'}).text.strip()
                job_description = soup.find('div', {'class': 'show-more-less-html__markup'}).text.strip()

                return job_title, company_name, job_description
            else:
                print("Failed to fetch the LinkedIn page. Status code:", response.status_code)
        except Exception as e:
            print("An error occurred while scraping the LinkedIn page:", str(e))

    try:
        # Scrape job details from the LinkedIn URL
        title, company, description = scrape_linkedin_job_post(linkedin_url)

        # Preprocess the user job post description
        preprocessed_user_description = preprocess_text(description)

        # Load the job postings dataset
        #already loaded

        # Initialize TF-IDF vectorizer
        tfidf_vectorizer = TfidfVectorizer()

        # Fit-transform the preprocessed job descriptions to create TF-IDF vectors
        tfidf_matrix = tfidf_vectorizer.fit_transform(job_postings_df['clean_description'])

        # Transform the preprocessed user job post description into a TF-IDF vector
        user_tfidf_vector = tfidf_vectorizer.transform([preprocessed_user_description])

        # Calculate cosine similarity between the user's job post and all other job posts
        similarity_scores = cosine_similarity(user_tfidf_vector, tfidf_matrix)

        # Flatten the similarity scores array and sort in descending order
        similarity_scores = similarity_scores.flatten()
        sorted_indices = similarity_scores.argsort()[::-1]

        # Get the indices of top similar job postings
        N = 10  # Number of top similar job postings to retrieve
        top_similar_indices = sorted_indices[:N]

        # Retrieve top similar job postings from the DataFrame
        top_similar_job_postings = job_postings_df.iloc[top_similar_indices]

        # Initialize an empty list to store similar job postings
        similar_job_postings = []

        # Iterate over the top similar job postings DataFrame
        for index, row in top_similar_job_postings.iterrows():
            # Extract job title, description, and company name
            title = row['title']
            description = row['description']
            company_name = row['company_name']

            # Create a dictionary to represent the job posting
            job_posting = {'title': title, 'description': description, 'company_name': company_name}

            # Append the job posting dictionary to the list
            similar_job_postings.append(job_posting)
        clubbed_description = '\n'.join(job['description'] for job in similar_job_postings)
        
        similar_jobs_df = pd.DataFrame(similar_job_postings)
        summary=generate_gemini_content_linkedin(description,clubbed_description)
        # Plot similar job postings as a table using Matplotlib
        # Plot similar job postings as a table using Matplotlib
        plt.figure(figsize=(12, 8))  # Adjust the figure size
        table = plt.table(cellText=similar_jobs_df[['title', 'company_name']].values, 
                        colLabels=['Title', 'Company Name'], 
                        loc='center')

        # Adjust font size
        table.auto_set_font_size(False)
        table.set_fontsize(12)  # Set font size

        plt.axis('off')  # Turn off axis
        plt.title('Similar Job Postings', fontsize=16)  # Adjust title font size
        plt.tight_layout()  # Adjust layout to prevent overlap
        # plt.show()
        # plt.show()
        print("plot table created")

        


        plot_data = io.BytesIO()
        plt.savefig(plot_data, format='png')
        plot_data.seek(0)
        image_binary = Binary(plot_data.read())
        print("converted linkedin plot in binary result=",image_binary)
        return image_binary,summary,title

    except Exception as e:
        print("An error occurred:", str(e))





@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_query = request.form['user_query']
    print("user_query ",user_query)
    faq_data = load_faq_data()
    if user_query.strip() == "":
    
        response = "Can you repeat your query?"
    elif user_query.lower() in faq_data:
        
        response = faq_data[user_query.lower()]
    else:
        try:
            response = get_faq_answer(user_query, faq_data)
            if response == "Redirecting you to our Personalized Doubt Assistant":
                pass
        except Exception as e:
            print("error in Exception")
            response = "I'm sorry, I couldn't find an answer to your query."
    print("response ",response)
    return jsonify({'response': response})


# YOUTUBE SENTIMENT ANALYSIS


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    link = data.get('projectLink')
    email = data.get('email')
    name = data.get('name')
    projectType= data.get('projectType')

    print("Received POST request to /analyze")
    print("Data received:")
    print("Link:", link)
    print("Email:", email)
    print("Name:", name)
    print("ProjectType:", projectType)

    # Generate unique code
    unique_code = hashlib.sha256((email + link).encode()).hexdigest()

    try:
        # Call sentiment analysis script
        print("here in try")
        
        if(projectType=='youtube'):
            
            api_key = api_key_youtube
            result_image,summary,video_title=analyze_youtube_sentiment(link,api_key)
        
            

            # print("we got result= ",result)
            if result_image and summary:
                # Store image binary data in MongoDB
                print("result_image binarycode , ",result_image)
                image_binary = Binary(result_image)
                analysis_result = {
                    'link': link,
                    'project_type': projectType,
                    'image_binary': image_binary,
                    'email': email,
                    'name': name,
                    'unique_code': unique_code,
                    'summary':summary,
                    'video_title':video_title
                }
                collection.insert_one(analysis_result)

                # Return the analysis code in the response data
                return jsonify({'code': unique_code})
            
            else:
                return jsonify({'error': 'Failed to analyze sentiment'}), 500
        elif(projectType=='amazon'):
            result_image,result_summary=analyze_amazon_product_reviews(link)
            
            if result_image and result_summary:
                # Store image binary data in MongoDB
                print("result image binary code ",result_image)
                image_binary = Binary(result_image)
                analysis_result = {
                    'link': link,
                    'project_type': projectType,
                    'image_binary': image_binary,
                    'email': email,
                    'name': name,
                    'unique_code': unique_code,
                    'summary':result_summary
                }
                collection.insert_one(analysis_result)

                # Return the analysis code in the response data
                return jsonify({'code': unique_code})
            
            else:
                return jsonify({'error': 'Failed to analyze sentiment'}), 500
        else:
            result_image,summary,title=find_similar_job_postings(link)
            if result_image and summary:
                # Store image binary data in MongoDB
                print("result_image binarycode , ",result_image)
                image_binary = Binary(result_image)
                analysis_result = {
                    'link': link,
                    'project_type': projectType,
                    'image_binary': image_binary,
                    'email': email,
                    'name': name,
                    'unique_code': unique_code,
                    'summary':summary,
                    'video_title':title
                }
                collection.insert_one(analysis_result)

                # Return the analysis code in the response data
                return jsonify({'code': unique_code})
            
            else:
                return jsonify({'error': 'Failed to analyze sentiment'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/analysis-result/image/<code>')
def get_analysis_result_image(code):
    # Fetch analysis result from MongoDB based on unique code
    analysis_result = collection.find_one({'unique_code': code})
    if analysis_result:
        # Return the image binary data
        return analysis_result['image_binary']
    else:
        return jsonify({'error': 'Analysis result not found'}), 404

@app.route('/analysis-result/summary/<code>')
def get_analysis_result_summary(code):
    # Fetch analysis result from MongoDB based on unique code
    analysis_result = collection.find_one({'unique_code': code})
    if analysis_result:
        # Return the summary
        return jsonify({'summary': analysis_result['summary']})
    else:
        return jsonify({'error': 'Analysis result not found'}), 404





    


import base64
@app.route('/projects', methods=['GET'])
def get_projects():
    # Get user ID from query parameter
    user_id = request.args.get('userId')
    print("user id ",user_id)
    if not user_id:
        return jsonify({'message': 'User ID is required'}), 400

    # Query MongoDB for projects based on user ID
    projects = list(collection.find({'email': user_id}))
    
    # Convert ObjectId to str for JSON serialization
    for project in projects:
        project['_id'] = str(project['_id'])
        # Convert image_binary to base64
        if 'image_binary' in project:
            project['image_binary'] = base64.b64encode(project['image_binary']).decode('utf-8')
            print("lets see=",project['image_binary'])
    
    return jsonify(projects)

if __name__ == '__main__':
    app.run(port=8080,debug=True, use_reloader=False)
