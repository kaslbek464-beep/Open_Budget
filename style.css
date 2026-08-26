import os
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# --- SOZLAMALAR ---
# Telegram Bot ma'lumotlaringizni shu yerga kiriting
TELEGRAM_BOT_TOKEN = "8704925975:AAH5AlRFwLwGoU5xps2VaSH-fLYQkuRhsHQ"
TELEGRAM_ADMIN_ID = "8174374682"

def send_telegram_message(message_text):
    """Telegram Admin-ga xabar yuborish funksiyasi"""
    if TELEGRAM_BOT_TOKEN == "8704925975:AAH5AlRFwLwGoU5xps2VaSH-fLYQkuRhsHQ":
        return False
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_ADMIN_ID,
        "text": message_text,
        "parse_mode": "HTML"
    }
    try:
        res = requests.post(url, json=payload, timeout=5)
        return res.ok
    except Exception as e:
        print(f"Telegram xatolik: {e}")
        return False

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/vote/phone', methods=['POST'])
def vote_phone():
    data = request.json or {}
    phone = data.get('phone', '').strip()
    name = data.get('name', 'Noma\'lum').strip()
    
    if not phone:
        return jsonify({"success": False, "message": "Telefon raqam kiritilmadi!"}), 400

    msg = (
        f"📥 <b>YANGI OVOZ (Telefon Orqali)</b>\n\n"
        f"👤 <b>Ism:</b> {name}\n"
        f"📞 <b>Telefon:</b> <code>{phone}</code>\n"
        f"⏰ <b>Vaqt:</b> Qabul qilindi"
    )
    send_telegram_message(msg)
    
    # Rasmiy Open Budget ovoz berish manziliga yo'naltirish
    return jsonify({
        "success": True, 
        "redirect_url": "https://openbudget.uz"
    })

@app.route('/api/vote/oneid', methods=['POST'])
def vote_oneid():
    data = request.json or {}
    oneid_login = data.get('login', '').strip()
    name = data.get('name', 'Noma\'lum').strip()
    
    if not oneid_login:
        return jsonify({"success": False, "message": "OneID logini kiritilmadi!"}), 400

    msg = (
        f"🏛 <b>YANGI OVOZ (OneID Orqali)</b>\n\n"
        f"👤 <b>Ism:</b> {name}\n"
        f"🆔 <b>OneID Login:</b> <code>{oneid_login}</code>\n"
        f"⏰ <b>Vaqt:</b> Qabul qilindi"
    )
    send_telegram_message(msg)
    
    return jsonify({
        "success": True, 
        "redirect_url": "https://openbudget.uz"
    })

@app.route('/api/support/volunteer', methods=['POST'])
def register_volunteer():
    data = request.json or {}
    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()
    region = data.get('region', '').strip()

    msg = (
        f"🤝 <b>YANGI KO'NILLI (VALONTYOR)</b>\n\n"
        f"👤 <b>Ism:</b> {name}\n"
        f"📞 <b>Telefon:</b> <code>{phone}</code>\n"
        f"📍 <b>Hudud/Mahalla:</b> {region}"
    )
    send_telegram_message(msg)

    return jsonify({"success": True, "message": "Rahmat! Arizangiz qabul qilindi."})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
