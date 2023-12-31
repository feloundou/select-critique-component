import './myComponent.css';

import React, { useEffect, useState } from 'react';
import { Streamlit } from 'streamlit-component-lib';
import { useRenderData } from 'streamlit-component-lib-react-hooks';

const customContainer = {
  width: "100%",
  maxWidth: "100%",
  minHeight: "10000px",
}

type ChoicePairProps = {
  level: number
  content: string[]
  selectedOption: number
  treeIndex: number
  handleOptionClick: (
    treeindex: number,
    btnIndex: number,
    level: number,
    handleOptionReset: any
  ) => void
  updateTree: (
    treeindex: number,
    level: number,
    textInput: string,
    selectedOption: number,
    responseRatings: number
  ) => void
  sliceTree: (leafLevel: number) => void
  args: any
}

const ChoicePair: React.FC<ChoicePairProps> = ({
  level,
  content,
  treeIndex,
  updateTree,
  selectedOption,
  handleOptionClick,
  args,
}) => {
  const [textInput, setTextInput] = useState<string>("")
  const [responseRatings, setResponseRatings] = useState(1)

  useEffect(() => {
    if (args.tree.length > 0) {
      setTextInput(args.tree[treeIndex]?.critique)
      setResponseRatings(args.tree[treeIndex]?.responseRatings)
    }
  }, [])

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value)
  }

  const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponseRatings(+e.target.value)
  }

  const handleOptionReset = () => {
    setTextInput("")
    setResponseRatings(1)
  }
  const handleButtonClick = () => {
    updateTree(treeIndex, level, textInput, selectedOption, responseRatings)
  }

  return (
    <div className="choice-pair">
      <div style={{ display: "flex", justifyContent: "center" }}>
        {content.map((btnContent, btnIndex) => (
          <div
            key={btnIndex}
            className="d-flex flex-column align-items-center"
            style={{
              marginRight: btnIndex === 0 ? "2rem" : undefined,
              marginLeft: btnIndex === 1 ? "2rem" : undefined,
            }}
          >
            <button
              onClick={() => {
                handleOptionClick(
                  treeIndex,
                  btnIndex + 1,
                  level,
                  handleOptionReset
                )
              }}
              className={`btn btn-${selectedOption === btnIndex + 1 ? "secondary" : "primary"
                } my-1 responseBtn`}
            >
              {btnContent}
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "1.5rem",
              }}
            >
              {selectedOption !== 0 && selectedOption !== btnIndex + 1 && (
                <span style={{ color: "white", fontStyle: "italic" }}>
                  This response was not selected
                </span>
              )}
            </div>
            {selectedOption === btnIndex + 1 && (
              <input
                type="range"
                min="1"
                max="7"
                value={responseRatings}
                onChange={handleResponseChange}
                style={{ width: "150px", marginBottom: "1rem" }}
              />
            )}
            {selectedOption === btnIndex + 1 && (
              <div
                className="input-group mb-3"
                style={{ marginTop: "1rem", width: "400px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your critique"
                  value={textInput}
                  onChange={handleTextInputChange}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleButtonClick}
                >
                  Critique
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

type Node = {
  level: number
  index: number
  content: string[]
  critique: string
  responseRatings: number
  selectedOption: number
  children: any[]
}

type MyComponentState = {
  tree: Node[]
  critiques: { [key: string]: string }
}

interface MyComponentProps {
  args: any
}

const MyComponent: React.FC<any> = () => {
  const renderData = useRenderData()
  // const theme = renderData.theme
  const [tree, setTree] = useState<Node[]>([])
  const [prompt, setPrompt] = useState<string>()

  // const backgroundColor = theme?.backgroundColor || "#f7f7f7"

  const resetStyle = {
    margin: 0,
    padding: 0,
  }

  const sliceTree = (leafLevel: number) => {
    setTree((prevTree) => prevTree.slice(0, leafLevel))
  }

  const handleOnPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const updateTree = (
    treeIndex: number,
    level: number,
    textInput: string,
    selectedOption: number,
    responseRatings: number
  ) => {
    const newTree = [...tree]
    newTree[treeIndex] = {
      ...newTree[treeIndex],
      critique: textInput,
      level: level,
      responseRatings: responseRatings,
    }
    console.log(newTree)

    Streamlit.setComponentValue({
      tree: newTree,
      treeIndex: treeIndex,
      selectedOption: selectedOption,
    })
  }

  const handleClick = (
    treeindex: number,
    btnIndex: number,
    level: number,
    handleOptionReset: any
  ) => {
    let updatedData = [...tree]

    updatedData[treeindex] = {
      ...updatedData[treeindex],
      selectedOption: btnIndex,
    }

    setTree(updatedData)

    sliceTree(level + 1)
    handleOptionReset()
  }

  // Listen for changes in the 'count' prop from Streamlit
  useEffect(() => {
    if (renderData.args.tree) setTree(renderData.args.tree)
    if (renderData.args.prompt) setPrompt(renderData.args.prompt)
  }, [renderData.args])

  console.log("this is tree >>>>>>", tree)

  const handleOnSearch = () => {
    Streamlit.setComponentValue({
      prompt,
      tree,
      treeIndex: 0,
      selectedOption: 0,
    })
  }

  return (
    <div style={resetStyle}>
      <div className="container" style={customContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <div>
            <input
              style={{
                backgroundColor: "#007bff",
                border: "1px solid #007bff",
                borderRadius: "4px",
                color: "white",
                padding: "0.5rem 1rem",
                margin: "1rem",
              }}
              type="text"
              onChange={handleOnPromptChange}
              value={prompt}
              disabled
            />
            {/* <button onClick={handleOnSearch}>search</button> */}
          </div>

          <div>
            {tree.map((node, index) => (
              <div key={index}>
                <ChoicePair
                  level={node.level}
                  content={node.content}
                  updateTree={updateTree}
                  sliceTree={sliceTree}
                  selectedOption={node.selectedOption}
                  treeIndex={index}
                  handleOptionClick={handleClick}
                  args={renderData.args}
                />
                {index < tree.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyComponent
// export default withStreamlitConnection(MyComponent);