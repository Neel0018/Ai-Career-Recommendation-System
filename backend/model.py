import json

def recommend_career(interest, performance):

    with open("careers.json") as f:
        careers = json.load(f)

    results = []

    for career in careers:
        if (
            career["interest"].lower() == interest.lower()
            and career["performance"].lower() == performance.lower()
        ):
            results.append(career)

    return results