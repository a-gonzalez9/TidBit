from flask import Flask, request, jsonify
from gemini_client import model

app = Flask(__name__)

def generate_task_breakdown(task_description):
    prompt = f"""
        Turn the following assignment description into a clear, step-by-step checklist.
        - Start each line with “Step X:”
        - Break down the description into specific, actionable tasks.
        - If the description mentions a range (e.g., “questions 1–10”), expand it into individual steps.
        - If the description includes general instructions (e.g., “write an essay”), split it into logical sub-steps.
        - Do NOT do self-explanatory steps like “Understand the assignment” or “Gather materials” unless explicitly mentioned.
        - Try to keep below 10 steps unless absolutely necessary.
        - Always add a final step to review and submit the work.
        Description: {task_description}
    """

    response = model.generate_content(prompt)
    breakdown_text = response.text.strip()
    breakdown_items = [item.strip("- ").strip() for item in breakdown_text.split("\n") if item.strip()]
    return breakdown_items

@app.route("/tasks", methods=["POST"])
def receive_tasks():
    # Parse JSON body
    tasks = request.get_json(silent=True)
    if not tasks:
        return jsonify({"error": "No tasks provided"}), 400

    # Make sure tasks is a list
    if not isinstance(tasks, list):
        return jsonify({"error": "Expected a JSON array of tasks"}), 400

    # Process each task
    processed_tasks = []
    for task in tasks:
        if not isinstance(task, dict):
            continue  # skip invalid items

        processed_tasks.append({
            "task": task.get("task", ""),
            "date": task.get("date"),
            "time": task.get("time"),
            "description": task.get("description", ""),
            "priority": task.get("priority", "Medium"),
            "breakdown": generate_task_breakdown(task.get("description", "")),
        })

    print("Processed tasks:", processed_tasks)

    return jsonify({"tasks": processed_tasks}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)