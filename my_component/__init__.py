# import os
# import streamlit.components.v1 as components
# import streamlit as st
# import asyncio
# import aiohttp
# import openai

# _RELEASE = False

# if not _RELEASE:
#     _component_func = components.declare_component(
#         "my_component",
#         url="http://localhost:3001",
#     )
# else:
#     parent_dir = os.path.dirname(os.path.abspath(__file__))
#     build_dir = os.path.join(parent_dir, "frontend/build")
#     _component_func = components.declare_component("my_component", path=build_dir)

# if "model_response_str" not in st.session_state:
#     st.session_state.model_response_str = 0
# if "critique_clicked" not in st.session_state:
#     st.session_state.critique_clicked = False
# if "ai_responses" not in st.session_state:
#     st.session_state.ai_responses = {}
# if "ai_response" not in st.session_state:
#     st.session_state.ai_response = ''
# if "prompt" not in st.session_state:
#     st.session_state.prompt = ''

# if "tree" not in st.session_state:
#     st.session_state.tree = [
#      {
#         "level": 0,
#         "index": 0,
#         "content": ["Because God said so", "Because of Rayleigh scattering"],
#         'selectedOption': 0,
#         'critique': "",
#         'responseRatings': 1,
#         "children": [],
#     }
# ]
# openai.api_key = ""

# model = "gpt-3.5-turbo"
# temperature = 1


# critique_clicked = st.session_state.critique_clicked or False
# ai_response = st.session_state.ai_response or ""
# ai_responses = st.session_state.ai_responses or {}
# model_response_str = st.session_state.model_response_str or ''
# prompt = st.session_state.prompt or ''
# tree = st.session_state.tree or [
#     {
#         "level": 0,
#         "index": 0,
#         "content": ["Because God said so", "Because of Rayleigh scattering"],
#         'selectedOption': 0,
#         'critique': "",
#         'responseRatings': 1,
#         "children": [],
#     }
# ]


# def my_component(critique_clicked=None, ai_response=None, ai_responses=None,  tree=[],key=None):
#     component_value = _component_func(
#         tree=tree,
#         key=key,
#         default={}
#     )
#     return component_value

# async def chat_completion(prompt):
#     response = await openai.ChatCompletion.create(
#         model=model,
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt},
#         ],
#         temperature=temperature
#     )
#     return response.choices[0].message.content

# async def make_chat_requests():
#     prompts = ["Tell me a joke.", "What is the weather today?"]
#     tasks = [chat_completion(prompt) for prompt in prompts]
#     responses = await asyncio.gather(*tasks)
#     return responses


# def accumulate_formatted_text(data):
#     steered_system_message= "You are a chatbot, answering user questions in the most helpful way possible. You're great at using feedback to improve responses to the original prompt. Here's a summary of interactions you have had so far."

#     text = "The prompt: {prompt}. The following 2 responses were generated: Response 1: {response_1}, Response 2: {response_2}. The user selected: {selected_response_index} and rated it {likert_out_of_max}/{out_of_max}. They gave the following feedback: Critique: {critique}."

#     formatted_text = ""
#     subsequent_formatted_text = ""

#     subsequent_text = "The following 2 responses were generated: Response 1: {response_1}, Response 2: {response_2}. The user selected: {selected_response_index} and rated it {likert_out_of_max}/{out_of_max}. They gave the following feedback: Critique: {critique}."

#     max_rating = 7

#     for i, item in enumerate(data):

#         response_1 = item["content"][0]
#         response_2 = item["content"][1]
#         selected_response_index = item["selectedOption"]
#         likert_out_of_max = item["responseRatings"]
#         critique = item["critique"]

#         if i == 0:

#             # Format the text with the variables
#             formatted_text += text.format(
#                 prompt=prompt,
#                 response_1=response_1,
#                 response_2=response_2,
#                 selected_response_index=selected_response_index,
#                 likert_out_of_max=likert_out_of_max,
#                 critique=critique,
#                 out_of_max=max_rating
#             )
#             steered_system_message+=formatted_text

#         else:

#             subsequent_formatted_text += subsequent_text.format(
#                 response_1=response_1,
#                 response_2=response_2,
#                 selected_response_index=selected_response_index,
#                 likert_out_of_max=likert_out_of_max,
#                 critique=critique,
#                 out_of_max=max_rating
#             )

#             steered_system_message+=subsequent_formatted_text
#         # Extract variables from the item


#     return steered_system_message


# # Example usage:
# data = [
#     {
#         "level": 0,
#         "index": 0,
#         "content": ["Because God said so", "Because of Rayleigh scattering"],
#         'selectedOption': 0,
#         'critique': "",
#         'responseRatings': 1,
#         "children": [],
#     }
# ]

# formatted_text = accumulate_formatted_text(data)
# print(formatted_text)


# if not _RELEASE:
#     st.set_page_config(layout="wide")

#     response = my_component(
#         tree=tree
#     )

#     if response:
#         print(response)

#         loop = asyncio.get_event_loop()
#         results = loop.run_until_complete(make_chat_requests())

#         # # Process the results
#         # for promptResponse in results:
#         #     print(promptResponse)

#         st.session_state.prompt = response['prompt']
#         st.session_state.tree= response['tree']
#         print("this is the prompt >>>>",accumulate_formatted_text(response['tree']))

#         st.experimental_rerun()


# import os
# import streamlit.components.v1 as components
# import streamlit as st
# import asyncio
# import aiohttp
# import openai
# import concurrent.futures

# _RELEASE = False

# if not _RELEASE:
#     _component_func = components.declare_component(
#         "my_component",
#         url="http://localhost:3001",
#     )
# else:
#     parent_dir = os.path.dirname(os.path.abspath(__file__))
#     build_dir = os.path.join(parent_dir, "frontend/build")
#     _component_func = components.declare_component("my_component", path=build_dir)

# if "model_response_str" not in st.session_state:
#     st.session_state.model_response_str = 0
# if "critique_clicked" not in st.session_state:
#     st.session_state.critique_clicked = False
# if "ai_responses" not in st.session_state:
#     st.session_state.ai_responses = []
# if "ai_response" not in st.session_state:
#     st.session_state.ai_response = ''
# if "prompt" not in st.session_state:
#     st.session_state.prompt = ''

# if "tree" not in st.session_state:
#     st.session_state.tree = [

# ]
# openai.api_key = "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"

# model = "gpt-3.5-turbo"
# temperature = 1
# steered_system_message = "You are a chatbot, answering user questions in the most helpful way possible. You're great at using feedback to improve responses to the original prompt. Here's a summary of interactions you have had so far."


# critique_clicked = st.session_state.critique_clicked or False
# ai_response = st.session_state.ai_response or ""
# ai_responses = st.session_state.ai_responses or []
# model_response_str = st.session_state.model_response_str or ''
# prompt = st.session_state.prompt or ''
# tree = st.session_state.tree or []


# def my_component(critique_clicked=None, ai_response=None, ai_responses=None, tree=[],prompt= None, key=None):
#     component_value = _component_func(
#         tree=tree,
#         prompt= prompt,
#         ai_responses=ai_responses,
#         key=key,
#         default={}
#     )
#     return component_value


# async def chat_completion(prompt,steered_system_message):
#     if prompt is not None and prompt != '':

#         response = openai.ChatCompletion.create(
#             model=model,
#             messages=[
#                 {"role": "system", "content": steered_system_message},
#                 {"role": "user", "content": prompt},
#             ],
#             temperature=temperature
#         )
#         return response.choices[0].message.content
#     else:
#         response = openai.ChatCompletion.create(
#         model=model,
#         messages=[
#             {"role": "system", "content": steered_system_message},
#         ],
#         temperature=temperature
#         )
#         return response.choices[0].message.content


# async def make_chat_requests(prompt,steered_system_message):

#     prompts = [prompt, prompt]
#     tasks = [chat_completion(prompt,steered_system_message) for prompt in prompts]
#     responses = await asyncio.gather(*tasks)
#     return responses


# def accumulate_formatted_text(data,prompt):
#     steered_system_message = "You are a chatbot, answering user questions in the most helpful way possible. You're great at using feedback to improve responses to the original prompt. Here's a summary of interactions you have had so far."

#     text = "The prompt: {prompt}. The following 2 responses were generated: Response 1: {response_1}, Response 2: {response_2}. The user selected: {selected_response_index} and rated it {likert_out_of_max}/{out_of_max}. They gave the following feedback: Critique: {critique}."

#     formatted_text = ""
#     subsequent_formatted_text = ""

#     subsequent_text = "The following 2 responses were generated: Response 1: {response_1}, Response 2: {response_2}. The user selected: {selected_response_index} and rated it {likert_out_of_max}/{out_of_max}. They gave the following feedback: Critique: {critique}."

#     max_rating = 7
#     print(len(data))

#     if len(data) == 0 and prompt !=""  and  prompt is not None:
#         into_system_message="You are a chatbot, answering user questions in the most helpful way possible. You're great at using feedback to improve responses to the original prompt."
#         return into_system_message

#     else:
#         for i, item in enumerate(data):
#             response_1 = item["content"][0]
#             response_2 = item["content"][1]
#             selected_response_index = item["selectedOption"]
#             likert_out_of_max = item["responseRatings"]
#             critique = item["critique"]

#             if i == 0:

#                 # Format the text with the variables
#                 formatted_text+=text.format(
#                     prompt=prompt,
#                     response_1=response_1,
#                     response_2=response_2,
#                     selected_response_index=selected_response_index,
#                     likert_out_of_max=likert_out_of_max,
#                     critique=critique,
#                     out_of_max=max_rating
#                 )
#                 steered_system_message+=formatted_text

#             else:

#                 subsequent_formatted_text+=subsequent_text.format(
#                     response_1=response_1,
#                     response_2=response_2,
#                     selected_response_index=selected_response_index,
#                     likert_out_of_max=likert_out_of_max,
#                     critique=critique,
#                     out_of_max=max_rating
#                 )

#                 steered_system_message+=subsequent_formatted_text
#         return steered_system_message


# async def run_make_chat_requests(prompt,steered_system_message,level,index, treeIndex):
#     results = await make_chat_requests(prompt,steered_system_message)
#     print(treeIndex)

#     st.session_state.tree[treeIndex]= [{
#         "level": level,
#         "index": index,
#         "content": results,
#         'selectedOption': 0,
#         'critique': "",
#         'responseRatings': 1,
#         "children": [],
#     }]


#     print("these are the results for prompts >>>>>>",st.session_state.tree)


# if not _RELEASE:
#     st.set_page_config(layout="wide")

#     response = my_component(
#         tree=tree,
#         prompt= prompt,
#     )

#     if response:
#         print(response)
#         if 'prompt' in response:
#             st.session_state.prompt = response['prompt']
#             level = response['level']
#             index = response['index']
#             treeIndex = response['treeIndex']


#             filtered_responses = list(filter(lambda response: response["selectedOption"] != 0, response['tree']))
#             print("this is the prompt >>>>", accumulate_formatted_text(filtered_responses, response['prompt']))
#             asyncio.run(run_make_chat_requests(response['prompt'], accumulate_formatted_text(filtered_responses, response['prompt']),level,index, treeIndex))
#         else:
#             filtered_responses = list(filter(lambda response: response["selectedOption"] != 0, response['tree']))
#             print("this is the prompt >>>>", accumulate_formatted_text(filtered_responses,None))
#             asyncio.run(run_make_chat_requests(None, accumulate_formatted_text(filtered_responses, None),level,index, treeIndex))

#         st.experimental_rerun()


import os
import streamlit.components.v1 as components
import streamlit as st
import openai
import asyncio

_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "my_component", url="http://localhost:3001"
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("my_component", path=build_dir)

# openai.api_key = ""
openai.api_key = os.getenv("OPENAI_API_KEY")

model = "gpt-3.5-turbo"
temperature = 1
steered_system_message = "You are a chatbot, answering user questions in the most helpful way possible. You're great at using feedback to improve responses to the original prompt. Here's a summary of interactions you have had so far."

# if "model_response_str" not in st.session_state:
#     st.session_state.model_response_str = 0
if "critique_clicked" not in st.session_state:
    st.session_state.critique_clicked = False
if "ai_responses" not in st.session_state:
    st.session_state.ai_responses = []
if "ai_response" not in st.session_state:
    st.session_state.ai_response = ""
if "prompt" not in st.session_state:
    st.session_state.prompt = ""
if "tree" not in st.session_state:
    st.session_state.tree = []

# model_response_str = st.session_state.model_response_str
prompt = st.session_state.prompt
tree = st.session_state.tree


def my_component(
    critique_clicked=None,
    ai_response=None,
    ai_responses=None,
    tree=[],
    prompt=None,
    key=None,
):
    component_value = _component_func(
        tree=tree,
        prompt=prompt,
        ai_responses=ai_responses,
        key=key,
        default={},
    )
    return component_value


def chat_completion(prompt, steered_system_message):
    if prompt is not None and prompt != "":
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": steered_system_message},
                {"role": "user", "content": prompt},
            ],
            temperature=temperature,
        )
        return response.choices[0].message.content
    else:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": steered_system_message},
            ],
            temperature=temperature,
        )
        return response.choices[0].message.content


def make_chat_requests(prompt, steered_system_message):
    prompts = [prompt, prompt]
    responses = []
    for prompt in prompts:
        response = chat_completion(prompt, steered_system_message)
        responses.append(response)
    return responses


def accumulate_formatted_text(data, prompt):
    max_rating = 7
    if len(data) == 0 and prompt is not None and prompt != "":
        into_system_message = "You are a chatbot, answering user questions in the most helpful way possible. You're great at using feedback to improve responses to the original prompt."
        return into_system_message
    else:
        text = "The prompt: {prompt}. The following 2 responses were generated: Response 1: {response_1}, Response 2: {response_2}. The user selected: {selected_response_index} and rated it {likert_out_of_max}/{out_of_max}. They gave the following feedback: Critique: {critique}."
        subsequent_text = "The following 2 responses were generated: Response 1: {response_1}, Response 2: {response_2}. The user selected: {selected_response_index} and rated it {likert_out_of_max}/{out_of_max}. They gave the following feedback: Critique: {critique}."
        formatted_text = ""
        subsequent_formatted_text = ""
        steered_system_message = "You are a chatbot, answering user questions in the most helpful way possible. You're great at using feedback to improve responses to the original prompt. Here's a summary of interactions you have had so far."
        for i, item in enumerate(data):
            response_1 = item["content"][0]
            response_2 = item["content"][1]
            selected_response_index = item["selectedOption"]
            likert_out_of_max = item["responseRatings"]
            critique = item["critique"]

            if i == 0:
                formatted_text += text.format(
                    prompt=st.session_state.prompt,
                    response_1=response_1,
                    response_2=response_2,
                    selected_response_index=selected_response_index,
                    likert_out_of_max=likert_out_of_max,
                    critique=critique,
                    out_of_max=max_rating,
                )
                steered_system_message += formatted_text
            else:
                subsequent_formatted_text += subsequent_text.format(
                    response_1=response_1,
                    response_2=response_2,
                    selected_response_index=selected_response_index,
                    likert_out_of_max=likert_out_of_max,
                    critique=critique,
                    out_of_max=max_rating,
                )
                steered_system_message += subsequent_formatted_text
        return steered_system_message


async def run_make_chat_requests(
    prompt, steered_system_message, level, tree_index, selectedOption
):
    # print("this is console from run_make_chat_requests >>>>>>",prompt,level, tree_index)
    responses = make_chat_requests(prompt, steered_system_message)
    # if tree_index < len(st.session_state.tree):
    #     print("hello >>>>>>>")
    #     tree[tree_index] = {
    #         "level": level,
    #         "index": index,
    #         "content": ["hi there is one ", "this is 2"],
    #         'selectedOption': selectedOption,
    #         'critique': "",
    #         'responseRatings': responseRatings,
    #         "children": [],
    #     }

    # newTrees = tree[:tree_index+1]
    # print("this is new trees >>>>",newTrees)
    # st.session_state.tree = newTrees

    # else:
    tree.append(
        {
            "level": level,
            "content": responses,
            "selectedOption": 0,
            "critique": "",
            "responseRatings": 1,
            "children": [],
        }
    )
    st.session_state.tree = tree

    # print("These are the results for prompts >>>>>>", st.session_state.tree)


if not _RELEASE:
    st.set_page_config(layout="wide")

    response = my_component(tree=tree, prompt=prompt)

    if response:
        print(response)
        tree_index = response["treeIndex"]
        # responseRatings = response['responseRatings']
        selectedOption = response["selectedOption"]
        tree = response["tree"]

        if "prompt" in response:
            st.session_state.prompt = response["prompt"]
            filtered_responses = list(
                filter(
                    lambda response: response["selectedOption"] != 0, response["tree"]
                )
            )
            asyncio.run(
                run_make_chat_requests(
                    response["prompt"],
                    accumulate_formatted_text(filtered_responses, response["prompt"]),
                    0,
                    tree_index,
                    selectedOption,
                )
            )
            print(
                "this is console 1 >>>>>>>",
                accumulate_formatted_text(filtered_responses, response["prompt"]),
            )

            st.experimental_rerun()
        else:
            filtered_responses = list(
                filter(
                    lambda response: response["selectedOption"] != 0, response["tree"]
                )
            )
            print(
                "this is console 2 >>>>>>>",
                accumulate_formatted_text(filtered_responses, None),
            )

            asyncio.run(
                run_make_chat_requests(
                    None,
                    accumulate_formatted_text(filtered_responses, None),
                    tree[tree_index]["level"] + 1,
                    tree_index,
                    selectedOption,
                )
            )
            st.experimental_rerun()
