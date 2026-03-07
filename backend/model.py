import json

with open("careers.json") as f:
    careers = json.load(f)

def recommend_career(interest, performance):

    results = [
    career for career in careers
    if career["interest"].lower() == interest.lower()
    and career["performance"].lower() == performance.lower()
]
    
    return results
