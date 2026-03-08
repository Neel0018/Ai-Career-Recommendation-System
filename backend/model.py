import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load careers dataset
with open("careers.json") as f:
    careers = json.load(f)

# Combine skills + interest text for vectorization
career_texts = [
    " ".join(career["skills"]) + " " + career["interest"]
    for career in careers
]

vectorizer = TfidfVectorizer()
career_vectors = vectorizer.fit_transform(career_texts)
performance_rank = {"Low":1, "Medium":2, "High":3}
MIN_MATCH_SCORE=0.25


def recommend_career(interest, skills, academic_score, performance):

    # Create user query
    user_text = " ".join(skills) + " " + interest

    user_vector = vectorizer.transform([user_text])

    similarities = cosine_similarity(user_vector, career_vectors)[0]

    ranked_indices = similarities.argsort()[::-1]

    results = []

    for i in ranked_indices:

        career = careers[i]
        score=similarities[i]

        if score<MIN_MATCH_SCORE:
            continue

        # Academic score filter
        if academic_score < career["min_score"]:
            continue


        if performance_rank[performance] < performance_rank[career["performance"]]:
            continue

        result = career.copy()
        result["match_score"] = float(similarities[i])

        results.append(result)

    return results[:3]
