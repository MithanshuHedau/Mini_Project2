import pandas as pd

def load_resumes():
    """Load resumes from an Excel file."""
    df = pd.read_excel(r"C:\Users\mitha\Downloads\Project\Backend\Resume_Dataset.xlsx")
    return df.to_dict(orient="records")


def calculate_score(resume, keywords):
    """Calculate score based on keyword matches."""
    fields_to_search = ["Summary", "Degree", "Techskill", "Softskill", "Experience"]
    combined_text = " ".join(str(resume.get(field, "")).lower() for field in fields_to_search)
    score = sum(1 for word in keywords.split() if word.lower() in combined_text)
    return score


def rank_resumes(keywords):
    """Rank resumes based on keyword relevance."""
    resumes = load_resumes()
    for resume in resumes:
        resume["score"] = calculate_score(resume, keywords)

    ranked_resumes = sorted(resumes, key=lambda x: x["score"], reverse=True)
    return [{"name": resume["Name"], "score": resume["score"]} for resume in ranked_resumes if resume["score"] > 0]