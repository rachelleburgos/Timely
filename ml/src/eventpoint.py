from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from datetime import datetime, timedelta
import json

# This gets information from the scheduled events database
#The AI will get information from here and compare it to information from the Inbox
#If there are collisions it will avoid scheduling an event for that slot, otherwise the client can handle if they want it scheduled for that slot
#it will only call events for one week.

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

app = Flask("Tensor")
app.json_encoder = CustomJSONEncoder  # Use the custom JSON encoder
api = Api(app)

# Get the current date and time
current_datetime = datetime.now()

# Modify Tasks to store start and end as datetime objects with the current day
Scheduled_Tasks = {
    'task1': {'title': 'gym', 'start': current_datetime.replace(hour=12, minute=0, second=0, microsecond=0), 'end': current_datetime.replace(hour=13, minute=30, second=0, microsecond=0)},
    'task2': {'title': 'Lunch with X', 'start': current_datetime.replace(hour=15, minute=42, second=0, microsecond=0), 'end': current_datetime.replace(hour=16, minute=30, second=0, microsecond=0)},
    'task3': {'title': 'grocery shopping', 'start': current_datetime.replace(hour=17, minute=0, second=0, microsecond=0), 'end': current_datetime.replace(hour=17, minute=15, second=0, microsecond=0)},
}

Inbox_Tasks = {
    'todo1': {'title': 'work', 'duration': 60},
    'todo2': {'title': 'pay bills', 'duration': 35} 
}

class ScheduledTasks(Resource):
    def get(self, task_ID):
        if task_ID == 'all':
            return jsonify({'Scheduled Tasks': Scheduled_Tasks})
        elif task_ID in Scheduled_Tasks:
            return jsonify({
                'title': Scheduled_Tasks[task_ID]['title'],
                'start': Scheduled_Tasks[task_ID]['start'],
                'end': Scheduled_Tasks[task_ID]['end']
            })

class InboxItems(Resource):
    def get(self, task_ID):
        if task_ID == 'all':
            return jsonify({'Inbox Items': Inbox_Tasks})
        elif task_ID in Inbox_Tasks:
            return jsonify({
                'title': Inbox_Tasks[task_ID]['title'],
                'duration': Inbox_Tasks[task_ID]['duration']
            })

api.add_resource(ScheduledTasks, '/Scheduled_Tasks/<task_ID>')
api.add_resource(InboxItems, '/Inbox_Tasks/<task_ID>')

if __name__ == '__main__':
    app.run()
