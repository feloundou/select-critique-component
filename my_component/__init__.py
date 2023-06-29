import os
import streamlit.components.v1 as components


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


def my_component(name, key=None):

    component_value = _component_func(name=name, key=key, default=0)

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value


import streamlit as st

st.set_page_config(layout="wide")

my_component("World")

# # Add some test code to play with the component while it's in development.
# # During development, we can run this just as we would any other Streamlit
# # app: `$ streamlit run my_component/__init__.py`
# if not _RELEASE:
#     import streamlit as st

#     st.subheader("Component with constant args")

#     # Create an instance of our component with a constant `name` arg, and
#     # print its output value.
#     num_clicks = my_component("World")
#     st.markdown("You've clicked %s times!" % int(num_clicks))

#     st.markdown("---")
#     st.subheader("Component with variable args")

#     # Create a second instance of our component whose `name` arg will vary
#     # based on a text_input widget.
#     #
#     # We use the special "key" argument to assign a fixed identity to this
#     # component instance. By default, when a component's arguments change,
#     # it is considered a new instance and will be re-mounted on the frontend
#     # and lose its current state. In this case, we want to vary the component's
#     # "name" argument without having it get recreated.
#     name_input = st.text_input("Enter a name", value="Streamlit")
#     num_clicks = my_component(name_input, key="foo")
#     st.markdown("You've clicked %s times!" % int(num_clicks))
