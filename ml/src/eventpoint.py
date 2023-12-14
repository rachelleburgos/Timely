from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from datetime import datetime, timedelta
import json

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

app = Flask("Tensor")
app.json_encoder = CustomJSONEncoder  # Use the custom JSON encoder
api = Api(app)

# Paths to JSON files
SCHEDULED_TASKS_FILE = 'scheduled_tasks.json'
INBOX_TASKS_FILE = 'inbox_tasks.json'

def read_json(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        return {}

def write_json(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, cls=CustomJSONEncoder, indent=2)

# Read data from JSON files or initialize empty dictionaries
Scheduled_Tasks = read_json(SCHEDULED_TASKS_FILE)
Inbox_Tasks = read_json(INBOX_TASKS_FILE)


#Function that makes changes to file. Sorts scheduled tasks by their start time
def write_to_file():
    global Scheduled_Tasks, Inbox_Tasks
    Scheduled_Tasks = {k: t for k, t in sorted(Scheduled_Tasks.items(), key=lambda task: task[1]['start'])}
    with open(SCHEDULED_TASKS_FILE, 'w') as f:
        json.dump(Scheduled_Tasks, f, cls=CustomJSONEncoder, indent=2)
    with open(INBOX_TASKS_FILE, 'w') as f:
        json.dump(Inbox_Tasks, f, cls=CustomJSONEncoder, indent=2)

write_to_file()


#Get request for endpoint
'''
If the client gets 'all' it will return every event scheduled, sorted by the  start time
'''
class ScheduledTasks(Resource):
    def get(self, task_ID):
        if task_ID == 'all':
            return jsonify({'Scheduled Tasks': Scheduled_Tasks})
        elif task_ID in Scheduled_Tasks:
            return jsonify({
                'title': Scheduled_Tasks[task_ID]['title'],
                'start': Scheduled_Tasks[task_ID]['start'],
                'end': Scheduled_Tasks[task_ID]['end'],
                'description': Scheduled_Tasks[task_ID]['description'],
                'location': Scheduled_Tasks[task_ID]['location'],
                'All day': Scheduled_Tasks[task_ID]['isAllDay'],
                'Is Complete': Scheduled_Tasks[task_ID]['isComplete'],
                'priority': Scheduled_Tasks[task_ID]['priority'],
                'is reccuring': Scheduled_Tasks[task_ID]['isReccuring']
            })


#Get request for inbox items
'''
Inbox items are not sorted at the moment. Get request functions similarly to Schedule
'''
class InboxItems(Resource):
    def get(self, task_ID):
        if task_ID == 'all':
            return jsonify({'Inbox Items': Inbox_Tasks})
        elif task_ID in Inbox_Tasks:
            return jsonify({
                'title': Inbox_Tasks[task_ID]['title'],
                'duration': Inbox_Tasks[task_ID]['duration'],
                'description': Inbox_Tasks[task_ID]['description'],
                'priority': Inbox_Tasks[task_ID]['priority']
            })

class ScheduleInboxTask(Resource):
    def post(self):
        scheduled_tasks_copy = Scheduled_Tasks.copy()

        # Get JSON data from the POST request
        data = request.get_json()

        # Check if the inbox task ID is provided in the request
        if 'inbox_task_id' in data:
            inbox_task_id = data['inbox_task_id']

            # Check if the inbox task ID exists in Inbox_Tasks
            if inbox_task_id in Inbox_Tasks:
                inbox_task = Inbox_Tasks[inbox_task_id]

                # Define the fields to include in the scheduled task
                relevant_fields = ['title', 'start', 'end', 'description', 'location', 'priority', 'user', 'color', 'faIcon']

                # Iterate through scheduled tasks
                for task_id, scheduled_task in scheduled_tasks_copy.items():
                    if task_id != list(scheduled_tasks_copy.keys())[-1]:
                        next_task_id = list(scheduled_tasks_copy.keys())[list(scheduled_tasks_copy.keys()).index(task_id) + 1]
                        next_task = scheduled_tasks_copy[next_task_id]

                        # Parse date strings into datetime objects
                        scheduled_task_end = datetime.fromisoformat(scheduled_task['end'])
                        next_task_start = datetime.fromisoformat(next_task['start'])

                        time_difference = next_task_start - scheduled_task_end

                        # Check if the time difference is greater than the duration of the inbox task
                        if time_difference.total_seconds() / 60 >= inbox_task['duration']:
                            # Create a new dictionary for the scheduled task
                            new_task_id = f'task{len(Scheduled_Tasks) + 1}'
                            new_task_start = scheduled_task_end
                            new_task_end = new_task_start + timedelta(minutes=inbox_task['duration'])

                            # Extract relevant fields from the inbox task, filling missing values with None
                            scheduled_task_values = {field: inbox_task.get(field, None) for field in relevant_fields}

                            scheduled_task_values.update({
                                'start': new_task_start.isoformat(),
                                'end': new_task_end.isoformat(),
                            })

                            Scheduled_Tasks[new_task_id] = scheduled_task_values

                            # Remove the scheduled inbox task from Inbox_Tasks
                            del Inbox_Tasks[inbox_task_id]
                            write_to_file()
                            return jsonify({'message': f'Inbox Task {inbox_task_id} scheduled and removed from Inbox_Tasks'})

                return jsonify({'message': 'Unable to schedule inbox task. No suitable time slot found.'})
            else:
                return jsonify({'message': f'Inbox Task {inbox_task_id} not found in Inbox_Tasks'})
        else:
            return jsonify({'message': 'Please provide inbox_task_id in the request data.'})



# Add resources to the API
api.add_resource(ScheduledTasks, '/Scheduled_Tasks/<task_ID>')
api.add_resource(InboxItems, '/Inbox_Tasks/<task_ID>')
api.add_resource(ScheduleInboxTask, '/ScheduleInboxTask')

# Run the Flask application
if __name__ == '__main__':
    app.run()
