from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")




# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)


# response = requests.post(
#     "http://localhost:5000/chat",
#     json={
#         "context": "My name is John",
#         "prompt": "What is your name?",
#     },
# )
