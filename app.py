import os
from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Open Budget rasmiy havolasi
OPEN_BUDGET_URL = "https://openbudget.uz"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/vote', methods=['POST'])
def vote():
    # Telegram bot yoki bazaga yuborish mantiqini qo'shish mumkin
    return redirect(OPEN_BUDGET_URL)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
