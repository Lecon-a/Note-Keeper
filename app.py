from flask import Flask, render_template, jsonify, request
import sys
import os
from flask_sqlalchemy import SQLAlchemy
from gpt import tokenizer, model

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

def create_app():
    return app


class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True)
    note_topic = db.Column(db.String(), nullable=False)
    note_body = db.Column(db.String(), nullable=True)

    def topic(self):
        return {
            'id': self.id,
            'topic': self.note_topic
        }

    def info(self):
        return {
            'note_id': self.id,
            'note_topic': self.note_topic,
            'note_body': self.note_body
        }


db.create_all()


@app.route('/')
def index():
    notes = [note.info() for note in Note.query.order_by('id').all()]
    return render_template("index.html", notes=notes, total_notes=len(notes))


@app.route("/notes", methods=['POST'])
def create_note():
    try:
        data = request.get_json()
        new_note = data['new_note_body']
        new_note_topic = data['new_note_topic']
        note = Note(note_topic=new_note_topic, note_body=new_note)
        db.session.add(note)
        db.session.commit()
    except:
        db.session.rollback()
        print(sys.exc_info())
    finally:
        db.session.close()
        data = [note.topic() for note in Note.query.order_by('id').all()]
        return jsonify({
            'data': data,
            'data_length': len(data)
        })


@app.route("/notes/<n_id>", methods=['delete'])
def deleteNote(n_id):
    error = False
    topic = ''
    try:
        note = Note.query.get(n_id)
        topic = note.note_topic
        db.session.delete(note)
        db.session.commit()
    except:
        db.session.rollback()
        error = True
        print("Error :: ", sys.exc_info())
    finally:
        db.session.close()
        if not error:
            data = [note.topic() for note in Note.query.order_by('id').all()]
            return jsonify({
                'topic': topic,
                'data': data,
                'data_length': len(data)
            })


@app.route('/notes/<n_id>/edit', methods=['post'])
def editNote(n_id):
    error = False
    try:
        data = request.get_json()
        note = Note.query.get(n_id)
        note.note_topic = data['note_topic']
        note.note_body = data['note_body']
        db.session.commit()
    except:
        db.session.rollback()
        error = True
        print(sys.exc_info())
    finally:
        db.session.close()
        if not error:
            data = [note.topic() for note in Note.query.order_by('id').all()]
            return jsonify({
                'data': data,
                'data_length': len(data)
            })


@app.route('/notes/<n_id>')
def getOneNote(n_id):
    error = False
    data = ''
    try:
        note = Note.query.get(n_id)
        data = note.info()
    except:
        error = True
        print("Error :: ", sys.exc_info())
    finally:
        if not error:
            return jsonify({
                'note': data
            })


@app.route('/allNotes')
def all_notes():
    note = Note.query.order_by('id').all()
    data = [n.topic() for n in note]
    return jsonify({
        'data': data,
        'data_length': len(data)
    })


@app.route("/chat", methods=["POST"])
def chat_with_gpt():
    data = request.json
    context = data["context"]
    prompt = data["prompt"]
    length = data.get("length", 50)
    top_k = data.get("top_k", 0)
    top_p = data.get("top_p", 0.9)
    pass
    # Tokenize the input
    # inputs = tokenizer.encode(context + prompt, return_tensors="pt")

    # Generate output using the Chat-GPT model
    # output = model.generate(
    #     inputs,
    #     max_length=length + len(prompt),
    #     temperature=1.0,
    #     top_k=top_k,
    #     top_p=top_p,
    #     repetition_penalty=1.2,
    #     do_sample=True,
    #     num_return_sequences=1,
    # )

    # Decode the output
    #response = tokenizer.decode(output[0], skip_special_tokens=True)

    #return jsonify({"response": response})
