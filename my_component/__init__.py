import os
import streamlit.components.v1 as components
import openai

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "my_component",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("my_component", path=build_dir)

# def my_component(name, ai_response="", key=None):
#     component_value = _component_func(name=name, key=key, default={})
#     return component_value

# def my_component(prompt=None, ai_response=None, key=None):
#     component_value = _component_func(ai_response=ai_response, key=key, default={})
#     return component_value

def my_component(critique_clicked=None, ai_response=None, key=None):
    component_value = _component_func(
        critique_clicked=critique_clicked, ai_response=ai_response, key=key, default={}
    )
    return component_value


##################################################################################

import os
import streamlit.components.v1 as components
import streamlit as st
import openai

def my_component(critique_clicked=None, ai_response=None, key=None):
    component_value = _component_func(
        critique_clicked=critique_clicked, ai_response=ai_response, key=key, default={}
    )
    return component_value

st.set_page_config(layout="wide")

if "model_response_str" not in st.session_state:
    st.session_state.model_response_str = ""
if "critique_clicked" not in st.session_state:
    st.session_state.critique_clicked = False

# response = my_component(
#     critique_clicked=st.session_state.critique_clicked,
#     ai_response=st.session_state.model_response_str,
# )

# response = my_component(ai_response=st.session_state.get("model_response_str", ""), key=st.session_state.get("unique_key", 0))

response = my_component(
    critique_clicked=st.session_state.get("critique_clicked", False),
    ai_response=st.session_state.get("model_response_str", ""),
    key=st.session_state.get("unique_key", 0)
)

if response and response.get("critique_clicked", False):
    critique = response["critique"]
    print("critique clicked")
    print(critique)

    openai.api_key = os.getenv("OPENAI_API_KEY")

    model = "gpt-3.5-turbo"
    temperature = 1

    prompt = "Why is the sky blue?"
    steered_system_message = "You are helping answer questions by a user"

    model_response = openai.ChatCompletion.create(
        model=model,
        messages=[
            {"role": "system", "content": steered_system_message},
            {"role": "user", "content": prompt},
        ],
        temperature=temperature,
    )
    print("Model response:")
    print(model_response)

    st.session_state.model_response_str = model_response["choices"][0]["message"]["content"]
    st.session_state.critique_clicked = False
    st.session_state.unique_key = st.session_state.get("unique_key", 0) + 1



# import os
# import streamlit.components.v1 as components
# import streamlit as st
# import openai

# def my_component(ai_response=None, key=None):
#     component_value = _component_func(ai_response=ai_response, key=key, default={})
#     return component_value

# def call_model(prompt):
#     openai.api_key = os.getenv("OPENAI_API_KEY")
#     model = "gpt-3.5-turbo"
#     temperature = 1
#     steered_system_message = "You are helping answer questions by a user"

#     model_response = openai.ChatCompletion.create(
#         model=model,
#         messages=[
#             {"role": "system", "content": steered_system_message},
#             {"role": "user", "content": prompt},
#         ],
#         temperature=temperature,
#     )
#     print("Model response:")
#     print(model_response)
#     return model_response["choices"][0]["message"]["content"]

# st.set_page_config(layout="wide")

# if "model_response_str" not in st.session_state:
#     st.session_state.model_response_str = ""

# response = my_component(ai_response=st.session_state.model_response_str)

# if response and response.get("critique_clicked", False):
#     level = response["level"]
#     index = response["index"]
#     critique = response["critique"]
#     print("critique clicked")
#     print(critique)

#     model_response_str = call_model(critique)
#     print("Model response:")
#     print(model_response_str)

#     st.session_state.model_response_str = model_response_str


# ##################################################################################
# import streamlit as st
# import openai

# st.set_page_config(layout="wide")

# # Store the response from my_component in a variable
# # response = my_component("World")
# # print(attr(my_component))

# # model_response_str = ""

# # response = my_component(ai_response=model_response_str)


# if "model_response_str" not in st.session_state:
#     st.session_state.model_response_str = ""

# response = my_component(ai_response=st.session_state.model_response_str)

# if response and response.get("critique_clicked", False):
#     level = response["level"]
#     index = response["index"]
#     critique = response["critique"]
#     print("critique clicked")
#     print(critique)

#     openai.api_key = os.getenv("OPENAI_API_KEY")

#     model = "gpt-3.5-turbo"
#     temperature = 1

#     prompt = "Why is the sky blue?"
#     steered_system_message = "You are helping answer questions by a user"

#     model_response = openai.ChatCompletion.create(
#         model=model,
#         messages=[
#             {"role": "system", "content": steered_system_message},
#             {"role": "user", "content": prompt},
#         ],
#         temperature=temperature,
#     )
#     print("Model response:")
#     print(model_response)

#     # model_response_str = model_response["choices"][0]["message"]["content"]
#     st.session_state.model_response_str = model_response["choices"][0]["message"]["content"]

#     # print(model_response_str)
#     st.experimental_rerun()

