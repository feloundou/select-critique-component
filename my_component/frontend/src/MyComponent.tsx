// import React, { useState } from 'react';
// import {
//     Streamlit, StreamlitComponentBase, withStreamlitConnection
// } from 'streamlit-component-lib';

// const customContainer = {
//   width: '100%',
//   maxWidth: '100%',
//   minHeight: '1000px',
// };

// type ChoicePairProps = {
//   level: number;
//   index: number;
//   content: string[];
//   updateTree: (level: number, index: number, textInput: string) => void;
//   sliceTree: (leafLevel: number) => void;
//   setAIResponse: (response: { level: number; index: number; critique: string; critique_clicked: boolean }) => void;
//   args: any;
//   pair_ai_responses: { [key: string]: string };
//   critique: string;
// };

// const ChoicePair: React.FC<ChoicePairProps> = ({
//   level,
//   index,
//   content,
//   updateTree,
//   sliceTree,
//   setAIResponse,
//   args,
//   pair_ai_responses,
//   critique,
// }) => {
//   const [clicked, setClicked] = useState<boolean[]>([false, false]);
//   const [textInput, setTextInput] = useState<string>('');

//   console.log(`Current args.ai_response for level ${level}, index ${index}:`, args.ai_response);

//   const handleClick = (btnIndex: number) => {
//     const newClickedState = clicked.map((c, i) => i === btnIndex);
//     setClicked(newClickedState);
//     sliceTree(level + 1);
//     setTextInput('');
//   };

//   const handleTextInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setTextInput(e.target.value);
//   };

//   const handleButtonClick = () => {
//     updateTree(level, index, textInput);
//     setAIResponse({
//       level: level,
//       index: index,
//       critique: textInput,
//       critique_clicked: true,
//     });
//     setTextInput('');
//   };

//   const isParentButtonClicked = level === 1 && index === 1 && pair_ai_responses[`L${level - 1}I${(index - 1) / 2}`];

//   console.log("Pre-return Current ai_responses:", pair_ai_responses);

//   return (
//     <div className="choice-pair">
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         {content.map((btnContent, btnIndex) => (
//           console.log(`CHECK: level: ${level}, index: ${index}, btnIndex: ${btnIndex}, ai_responses:`, pair_ai_responses),
//           console.log(`TRIPLE CHECK: ${pair_ai_responses[`L1I1`]}`),
//           console.log("WHOA: level, index, ai_responses, isParentButtonClicked:", level, index, pair_ai_responses, isParentButtonClicked),
//           <div
//             key={btnIndex}
//             className="d-flex flex-column align-items-center"
//             style={{
//               marginRight: btnIndex === 0 ? '2rem' : undefined,
//               marginLeft: btnIndex === 1 ? '2rem' : undefined,
//             }}
//           >
//             <button
//               onClick={() => handleClick(btnIndex)}
//               className={`btn btn-${clicked[btnIndex] ? 'secondary' : 'primary'} my-1`}
//               style={{
//                 marginBottom: '1.5rem',
//                 whiteSpace: 'normal',
//                 width: '12rem',
//               }}
//             >
//               {pair_ai_responses[`L${level}I${index}`] && btnIndex === 1
//                 ? pair_ai_responses[`L${level}I${index}`]
//                 : btnContent
//               }
//             </button>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 minHeight: '1.5rem',
//               }}
//             >
//               {!clicked[btnIndex] && clicked[1 - btnIndex] && (
//                 <span style={{ color: 'white', fontStyle: 'italic' }}>
//                   This response was not selected
//                 </span>
//               )}
//             </div>
//             {clicked[btnIndex] && (
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 defaultValue="50"
//                 style={{ width: '150px', marginBottom: '1rem' }}
//               />
//             )}
//             {clicked[btnIndex] && (
//               <div
//                 className="input-group mb-3"
//                 style={{ marginTop: '1rem', width: '300px' }}
//               >
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your commentary"
//                   value={textInput}
//                   onChange={handleTextInputChange}
//                 />
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={handleButtonClick}
//                 >
//                   Critique
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// type Node = {
//   level: number;
//   index: number;
//   content: string[];
//   children: any[];
// };

// type MyComponentState = {
//   tree: Node[];
//   critiques: { [key: string]: string };
//   ai_responses: { [key: string]: string };
// };

// class MyComponent extends StreamlitComponentBase<MyComponentState> {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       tree: [
//         {
//           level: 0,
//           index: 0,
//           content: [
//             'Because God said so',
//             'Because of Rayleigh scattering',
//           ],
//           children: [],
//         },
//       ],
//       critiques: {},
//       ai_responses: props.args.ai_responses || {},
//     };
//   }

//   sliceTree = (leafLevel: number) => {
//     this.setState({ tree: this.state.tree.slice(0, leafLevel) });
//   }

//   waitForAIResponse = async (ai_responses: { [key: string]: string }, key: string) => {
//     while (!ai_responses[key]) {
//       await new Promise((resolve) => setTimeout(resolve, 100));
//     }
//   };

//   updateTree = async (level: number, index: number, textInput: string) => {
//     const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

//     const key = `L${level}I${index}`;
//     const critiques = { ...this.state.critiques, [key]: textInput };

//     console.log("WOW, Current critiques:", critiques);
//     console.log("WOWOWOW, level, index, props:", level, index, this.props.args);

//     if (level === 0 && index === 1) {
//       await this.waitForAIResponse(this.state.ai_responses, 'L1I1');
//     }

//     const newNode: Node = {
//       level: level + 1,
//       index: tree.length,
//       content: [
//         `Level ${level + 1}, Index ${index * 2} response: BLANK`,
//         `Level ${level + 1}, Index ${index * 2 + 1} response: ${this.props.args.ai_responses[`L${level + 1}I${index * 2 + 1}`] || ''}`,
//       ],
//       children: [],
//     };

//     tree.push(newNode);
//     this.setState({ tree, critiques });
//   };

//   render() {
//     const { tree } = this.state;
//     console.log("whoo, Current aiResponses:", this.props.args);

//     return (
//       <div className="container" style={customContainer}>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '2rem',
//           }}
//         >
//           <button
//             style={{
//               backgroundColor: '#007bff',
//               border: '1px solid #007bff',
//               borderRadius: '4px',
//               color: 'white',
//               padding: '0.5rem 1rem',
//               margin: '1rem',
//               pointerEvents: 'none',
//             }}
//           >
//             Why is the sky blue?
//           </button>
//           <div>
//             {tree.map((node, index) => (
//               <div key={index}>
//                 <ChoicePair
//                   level={node.level}
//                   index={node.index}
//                   content={node.content}
//                   updateTree={this.updateTree}
//                   sliceTree={this.sliceTree}
//                   setAIResponse={(response: {
//                     level: number;
//                     index: number;
//                     critique: string;
//                     critique_clicked: boolean;
//                   }) => {
//                     const key = `L${response.level}I${response.index}`;
//                     this.setState((prevState) => ({
//                       ai_responses: {
//                         ...prevState.ai_responses,
//                         [key]: response.critique,
//                       },
//                     }));
//                   }}
//                   args={this.props.args}
//                   pair_ai_responses={this.state.ai_responses}
//                   critique={this.state.critiques[`L${node.level}I${node.index}`]}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withStreamlitConnection(MyComponent);


// import React, { useState } from 'react';
// import {
//     Streamlit, StreamlitComponentBase, withStreamlitConnection
// } from 'streamlit-component-lib';

// const customContainer = {
//   width: '100%',
//   maxWidth: '100%',
//   minHeight: '1000px',
// };

// type ChoicePairProps = {
//   level: number;
//   index: number;
//   content: string[];
//   updateTree: (level: number, index: number, textInput: string) => void;
//   sliceTree: (leafLevel: number) => void;
//   setAIResponse: (response: { level: number; index: number; critique: string; critique_clicked: boolean }) => void;
//   args: any;
//   pair_ai_responses: { [key: string]: string };
//   critique: string;
// };

// const ChoicePair: React.FC<ChoicePairProps> = ({
//   level,
//   index,
//   content,
//   updateTree,
//   sliceTree,
//   setAIResponse,
//   args,
//   pair_ai_responses,
//   critique,
// }) => {
//   const [clicked, setClicked] = useState<boolean[]>([false, false]);
//   const [textInput, setTextInput] = useState<string>('');

//   console.log(`Current args.ai_response for level ${level}, index ${index}:`, args.ai_response);

//   const handleClick = (btnIndex: number) => {
//     const newClickedState = clicked.map((c, i) => i === btnIndex);
//     setClicked(newClickedState);
//     sliceTree(level + 1);
//     setTextInput('');
//   };

//   const handleTextInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setTextInput(e.target.value);
//   };

//   const handleButtonClick = () => {
//     updateTree(level, index, textInput);
//     setAIResponse({
//       level: level,
//       index: index,
//       critique: textInput,
//       critique_clicked: true,
//     });
//     setTextInput('');
//   };

//   const isParentButtonClicked = level === 1 && index === 1 && pair_ai_responses[`L${level - 1}I${(index - 1) / 2}`];
//   console.log("Pre-return Current ai_responses:", pair_ai_responses);

//   return (
//     <div className="choice-pair">
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         {content.map((btnContent, btnIndex) => (
//           console.log(`CHECK: level: ${level}, index: ${index}, btnIndex: ${btnIndex}, ai_responses:`, pair_ai_responses),
//           console.log(`TRIPLE CHECK: ${pair_ai_responses[`L1I1`]}`),
//           console.log("WHOA: level, index, ai_responses, isParentButtonClicked:", level, index, pair_ai_responses, isParentButtonClicked),
//           <div
//             key={btnIndex}
//             className="d-flex flex-column align-items-center"
//             style={{
//               marginRight: btnIndex === 0 ? '2rem' : undefined,
//               marginLeft: btnIndex === 1 ? '2rem' : undefined,
//             }}
//           >
//             <button
//               onClick={() => handleClick(btnIndex)}
//               className={`btn btn-${clicked[btnIndex] ? 'secondary' : 'primary'} my-1`}
//               style={{
//                 marginBottom: '1.5rem',
//                 whiteSpace: 'normal',
//                 width: '12rem',
//               }}
//             >
//               {/* {btnIndex === 1 && level === 1 && index === 1 && ai_responses && critique
//                 ? `Level ${level + 1}, Index ${index * 2 + 1} response: ${ai_responses[`L${level + 1}I${index * 2 + 1}`] || ''}`
//                 : btnContent} */}
//               {/* {level === 1 && index === 1 && btnIndex === 1
//                 ? ai_responses[`L1I1`] || btnContent
//                 : btnContent
//               } */}
//               {pair_ai_responses[`L${level}I${index}`] && btnIndex === 1
//                 ? pair_ai_responses[`L${level}I${index}`]
//                 : btnContent
//               }
//             </button>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 minHeight: '1.5rem',
//               }}
//             >
//               {!clicked[btnIndex] && clicked[1 - btnIndex] && (
//                 <span style={{ color: 'white', fontStyle: 'italic' }}>
//                   This response was not selected
//                 </span>
//               )}
//             </div>
//             {clicked[btnIndex] && (
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 defaultValue="50"
//                 style={{ width: '150px', marginBottom: '1rem' }}
//               />
//             )}
//             {clicked[btnIndex] && (
//               <div
//                 className="input-group mb-3"
//                 style={{ marginTop: '1rem', width: '300px' }}
//               >
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your commentary"
//                   value={textInput}
//                   onChange={handleTextInputChange}
//                 />
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={handleButtonClick}
//                 >
//                   Critique
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// type Node = {
//   level: number;
//   index: number;
//   content: string[];
//   children: any[];
// };

// type MyComponentState = {
//   tree: Node[];
//   critiques: { [key: string]: string };
//   ai_responses: { [key: string]: string };
// };

// class MyComponent extends StreamlitComponentBase<MyComponentState> {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       tree: [
//         {
//           level: 0,
//           index: 0,
//           content: [
//             'Because God said so',
//             'Because of Rayleigh scattering',
//           ],
//           children: [],
//         },
//       ],
//       critiques: {},
//       ai_responses: props.args.ai_responses || {},
//     };
//   }



//   sliceTree = (leafLevel: number) => {
//     this.setState({ tree: this.state.tree.slice(0, leafLevel) });
//   }

//   waitForAIResponse = async (ai_responses: { [key: string]: string }, key: string) => {
//     while (!ai_responses[key]) {
//       await new Promise((resolve) => setTimeout(resolve, 100));
//     }
//   };


//   // waitForAIResponse = (ai_responses: { [key: string]: string }, key: string) => {
//   //   return new Promise((resolve) => {
//   //     const interval = setInterval(() => {
//   //       if (ai_responses[key]) {
//   //         clearInterval(interval);
//   //         resolve(null);
//   //       }
//   //     }, 100);
//   //   });
//   // };

//   // updateTree = (level: number, index: number, textInput: string, ai_responses: { [key: string]: string }) => {
//   updateTree = async (level: number, index: number, textInput: string, ai_responses: { [key: string]: string }) => {
//     const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

//     const key = `L${level}I${index}`;
//     const critiques = { ...this.state.critiques, [key]: textInput };

//     console.log("WOW, Current critiques:", critiques);
//     console.log("WOWOWOW, level, index, props:", level, index, this.props.args);

//     console.log("Loading loading loading...", ai_responses);

//     if (level === 0) {
//       await this.waitForAIResponse(this.props.args.ai_responses, key);
//     }

//     const newNode: Node = {
//       level: level + 1,
//       index: tree.length,
//       content: [
//         `Level ${level + 1}, Index ${index * 2} response: BLANK`,
//         `Level ${level + 1}, Index ${index * 2 + 1} response: ${this.props.args.ai_responses[`L${level + 1}I${index * 2 + 1}`] || ''}`,
//       ],
//       children: [],
//     };

//     // wait until the AI response is ready




//     tree.push(newNode);
//     this.setState({ tree, critiques });
//     // console.log("component stage: level, index, ai_responses:", level, index, ai_responses);
//   };

//   render() {
//     const { tree } = this.state;
//     console.log("whoo, Current aiResponses:", this.props.args);

//     return (
//       <div className="container" style={customContainer}>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '2rem',
//           }}
//         >
//           <button
//             style={{
//               backgroundColor: '#007bff',
//               border: '1px solid #007bff',
//               borderRadius: '4px',
//               color: 'white',
//               padding: '0.5rem 1rem',
//               margin: '1rem',
//               pointerEvents: 'none',
//             }}
//           >
//             Why is the sky blue?
//           </button>
//           <div>
//             {tree.map((node, index) => (
//               <div key={index}>
//                 <ChoicePair
//                   level={node.level}
//                   index={node.index}
//                   content={node.content}
//                   updateTree={this.updateTree}
//                   sliceTree={this.sliceTree}
//                   setAIResponse={(response: {
//                     level: number;
//                     index: number;
//                     critique: string;
//                     critique_clicked: boolean;
//                   }) => {
//                     const key = `L${response.level}I${response.index}`;
//                     const critiques = { ...this.state.critiques, [key]: response.critique };
//                     this.setState({ critiques });
//                     Streamlit.setComponentValue(response);
//                   }}
//                   args={this.props.args}
//                   pair_ai_responses={this.state.ai_responses}
//                   critique={this.state.critiques[`L${node.level}I${node.index}`] || ''}
//                 />
//                 {index < tree.length - 1 && <hr />}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withStreamlitConnection(MyComponent);


import React, { useState } from 'react';
import {
    Streamlit, StreamlitComponentBase, withStreamlitConnection
} from 'streamlit-component-lib';

const customContainer = {
  width: '100%',
  maxWidth: '100%',
  minHeight: '1000px',
};

type ChoicePairProps = {
  level: number;
  index: number;
  content: string[];
  updateTree: (level: number, index: number, textInput: string) => void;
  sliceTree: (leafLevel: number) => void;
  setAIResponse: (response: { critique: string; critique_clicked: boolean }) => void;
  args: any;
};

const ChoicePair: React.FC<ChoicePairProps> = ({
  level,
  index,
  content,
  updateTree,
  sliceTree,
  setAIResponse,
  args,
}) => {
  const [clicked, setClicked] = useState<boolean[]>([false, false]);
  const [textInput, setTextInput] = useState<string>('');

  console.log(`Current args.ai_response for level ${level}, index ${index}:`, args.ai_response);

  const handleClick = (btnIndex: number) => {
    const newClickedState = clicked.map((c, i) => i === btnIndex);
    setClicked(newClickedState);
    sliceTree(level + 1);
    setTextInput('');
  };

  const handleTextInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput(e.target.value);
  };

  const handleButtonClick = () => {
    updateTree(level, index, textInput);
    setAIResponse({ critique: textInput, critique_clicked: true });
    setTextInput('');
  };

  return (
    <div className="choice-pair">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {content.map((btnContent, btnIndex) => (
          <div
            key={btnIndex}
            className="d-flex flex-column align-items-center"
            style={{
              marginRight: btnIndex === 0 ? '2rem' : undefined,
              marginLeft: btnIndex === 1 ? '2rem' : undefined,
            }}
          >
            <button
              onClick={() => handleClick(btnIndex)}
              className={`btn btn-${clicked[btnIndex] ? 'secondary' : 'primary'
                } my-1`}
              style={{
                marginBottom: '1.5rem',
                whiteSpace: 'normal',
                width: '12rem',
              }}
            >
              {btnIndex === 1 && level === 1 && args && args.ai_response
                ? `Level ${level + 1}, Index ${index * 2 + 1} response: ${args.ai_response}`
                : btnContent}
            </button>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '1.5rem',
              }}
            >
              {!clicked[btnIndex] && clicked[1 - btnIndex] && (
                <span style={{ color: 'white', fontStyle: 'italic' }}>
                  This response was not selected
                </span>
              )}
            </div>
            {clicked[btnIndex] && (
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                style={{ width: '150px', marginBottom: '1rem' }}
              />
            )}
            {clicked[btnIndex] && (
              <div
                className="input-group mb-3"
                style={{ marginTop: '1rem', width: '300px' }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your commentary"
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
  );
};

type Node = {
  level: number;
  index: number;
  content: string[];
  children: any[];
};

type MyComponentState = {
  tree: Node[];
  critiques: { [key: string]: string };
};

class MyComponent extends StreamlitComponentBase<MyComponentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      tree: [
        {
          level: 0,
          index: 0,
          content: [
            'Because God said so',
            'Because of Rayleigh scattering',
          ],
          children: [],
        },
      ],
      critiques: {},
    };
  }

  sliceTree = (leafLevel: number) => {
    this.setState({ tree: this.state.tree.slice(0, leafLevel) });
  }

  updateTree = (level: number, index: number, textInput: string) => {
    const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

    const key = `L${level}I${index}`;
    const critiques = { ...this.state.critiques, [key]: textInput };

    const newNode: Node = {
      level: level + 1,
      index: tree.length,
      content: [
        `Level ${level + 1}, Index ${index * 2} response: BLANK`,
        `Level ${level + 1}, Index ${index * 2 + 1} response: ${this.props.args.ai_response}`,
      ],
      children: [],
    };

    tree.push(newNode);
    this.setState({ tree, critiques });
  };

  render() {
    const { tree } = this.state;

    return (
      <div className="container" style={customContainer}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '4px',
              color: 'white',
              padding: '0.5rem 1rem',
              margin: '1rem',
              pointerEvents: 'none',
            }}
          >
            Why is the sky blue?
          </button>
          <div>
            {tree.map((node, index) => (
              <div key={index}>
                <ChoicePair
                  level={node.level}
                  index={node.index}
                  content={node.content}
                  updateTree={this.updateTree}
                  sliceTree={this.sliceTree}
                  setAIResponse={(response: { critique: string; critique_clicked: boolean }) => {
                    Streamlit.setComponentValue(response);
                  }}
                  args={this.props.args}
                />
                {index < tree.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStreamlitConnection(MyComponent);



// import React, { useEffect, useState } from 'react';
// import {
//     Streamlit, StreamlitComponentBase, withStreamlitConnection
// } from 'streamlit-component-lib';

// const customContainer = {
//   width: '100%',
//   maxWidth: '100%',
//   minHeight: '1000px',
// };

// type ChoicePairProps = {
//   level: number;
//   index: number;
//   content: string[];
//   updateTree: (level: number, index: number, textInput: string) => void;
//   sliceTree: (leafLevel: number) => void;
//   setAIResponse: (response: { critique: string; critique_clicked: boolean }) => void;
//   args: any;
// };

// const ChoicePair: React.FC<ChoicePairProps> = ({
//   level,
//   index,
//   content,
//   updateTree,
//   sliceTree,
//   setAIResponse,
//   args,
// }) => {
//   const [clicked, setClicked] = useState<boolean[]>([false, false]);
//   const [textInput, setTextInput] = useState<string>('');
//   const [updatedContent, setUpdatedContent] = useState<string[]>(content);

//   // useEffect(() => {
//   //   console.log('useEffect triggered:', level, index, args);
//   //   if (level > 0 && args && args.ai_response) {
//   //     console.log('Received ai_response:', args.ai_response); // Add this line to log ai_response
//   //     setUpdatedContent([
//   //       content[0],
//   //       `Level ${level + 1}, Index ${index * 2 + 1} response: ${args.ai_response}`,
//   //     ]);
//   //   }
//   // }, [args.ai_response, level, index, content]);

//   useEffect(() => {
//     console.log('useEffect triggered:', level, index, args);
//     if (level > 0 && args && args.ai_response) {
//       console.log('Received ai_response:', args.ai_response);
//       setUpdatedContent((prevContent) => [
//         prevContent[0],
//         `Level ${level + 1}, Index ${index * 2 + 1} response: ${args.ai_response}`,
//       ]);
//     }
//   }, [args.ai_response, level, index]);


//   const handleClick = (btnIndex: number) => {
//     const newClickedState = clicked.map((c, i) => i === btnIndex);
//     setClicked(newClickedState);
//     sliceTree(level + 1);
//     setTextInput('');
//   };

//   const handleTextInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setTextInput(e.target.value);
//   };

//   const handleButtonClick = () => {
//     updateTree(level, index, textInput);
//     setAIResponse({ critique: textInput, critique_clicked: true });
//     setTextInput('');
//   };

//   return (
//     <div className="choice-pair">
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         {updatedContent.map((btnContent, btnIndex) => (
//           <div
//             key={btnIndex}
//             className="d-flex flex-column align-items-center"
//             style={{
//               marginRight: btnIndex === 0 ? '2rem' : undefined,
//               marginLeft: btnIndex === 1 ? '2rem' : undefined,
//             }}
//           >
//             <button
//               onClick={() => handleClick(btnIndex)}
//               className={`btn btn-${clicked[btnIndex] ? 'secondary' : 'primary'
//                 } my-1`}
//               style={{
//                 marginBottom: '1.5rem',
//                 whiteSpace: 'normal',
//                 width: '12rem',
//               }}
//             >
//               {btnContent}
//             </button>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 minHeight: '1.5rem',
//               }}
//             >
//               {!clicked[btnIndex] && clicked[1 - btnIndex] && (
//                 <span style={{ color: 'white', fontStyle: 'italic' }}>
//                   This response was not selected
//                 </span>
//               )}
//             </div>
//             {clicked[btnIndex] && (
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 defaultValue="50"
//                 style={{ width: '150px', marginBottom: '1rem' }}
//               />
//             )}
//             {clicked[btnIndex] && (
//               <div className="input-group mb-3"
//                 style={{ marginTop: '1rem', width: '300px' }}
//               >
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your commentary"
//                   value={textInput}
//                   onChange={handleTextInputChange}
//                 />
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={handleButtonClick}
//                 >
//                   Critique
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div >
//   );
// };

// type Node = {
//   level: number;
//   index: number;
//   content: string[];
//   children: any[];
// };

// type MyComponentState = {
//   tree: Node[];
//   critiques: { [key: string]: string };
// };

// class MyComponent extends StreamlitComponentBase<MyComponentState> {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       tree: [
//         {
//           level: 0,
//           index: 0,
//           content: [
//             'Because God said so',
//             'Because of Rayleigh scattering',
//           ],
//           children: [],
//         },
//       ],
//       critiques: {},
//     };
//   }

//   sliceTree = (leafLevel: number) => {
//     this.setState({ tree: this.state.tree.slice(0, leafLevel) });
//   }

//   updateTree = (level: number, index: number, textInput: string) => {
//     const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

//     const key = `L${level}I${index}`;
//     const critiques = { ...this.state.critiques, [key]: textInput };

//     const newNode: Node = {
//       level: level + 1,
//       index: tree.length,
//       content: [
//         `Level ${level + 1}, Index ${index * 2} response: ${textInput}`,
//         `Level ${level + 1}, Index ${index * 2 + 1} response: ${this.props.args.ai_response}`,
//       ],
//       children: [],
//     };

//     tree.push(newNode);
//     this.setState({ tree, critiques });
//   };

//   render() {
//     const { tree } = this.state;

//     return (
//       <div className="container" style={customContainer}>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '2rem',
//           }}
//         >
//           <button
//             style={{
//               backgroundColor: '#007bff',
//               border: '1px solid #007bff',
//               borderRadius: '4px',
//               color: 'white',
//               padding: '0.5rem 1rem',
//               margin: '1rem',
//               pointerEvents: 'none',
//             }}
//           >
//             Why is the sky blue?
//           </button>
//           <div>
//             {tree.map((node, index) => (
//               <div key={index}>
//                 <ChoicePair
//                   level={node.level}
//                   index={node.index}
//                   content={node.content}
//                   updateTree={this.updateTree}
//                   sliceTree={this.sliceTree}
//                   setAIResponse={(response: { critique: string; critique_clicked: boolean }) => {
//                     Streamlit.setComponentValue(response);
//                   }}
//                   args={this.props.args}
//                 />
//                 {index < tree.length - 1 && <hr />}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withStreamlitConnection(MyComponent);





// import React, { useState } from 'react';
// import {
//   Streamlit, StreamlitComponentBase, withStreamlitConnection
// } from 'streamlit-component-lib';

// const customContainer = {
//   width: '100%',
//   maxWidth: '100%',
//   minHeight: '1000px',
// };

// type ChoicePairProps = {
//   level: number;
//   index: number;
//   content: string[];
//   updateTree: (level: number, index: number, textInput: string) => void;
//   sliceTree: (leafLevel: number) => void;
// };

// const ChoicePair: React.FC<ChoicePairProps> = ({
//   level,
//   index,
//   content,
//   updateTree,
//   sliceTree,
// }) => {
//   const [clicked, setClicked] = useState<boolean[]>([false, false]);
//   const [textInput, setTextInput] = useState<string>('');

//   const handleClick = (btnIndex: number) => {
//     const newClickedState = clicked.map((c, i) => i === btnIndex);
//     setClicked(newClickedState);
//     sliceTree(level + 1);
//     setTextInput('');
//   };

//   const handleTextInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setTextInput(e.target.value);
//   };

//   // const handleButtonClick = () => {
//   //   updateTree(level, index, textInput);
//   //   setTextInput('');
//   // };

//   const handleButtonClick = () => {
//     updateTree(level, index, textInput);
//     Streamlit.setComponentValue({ level, index, critique: textInput, critique_clicked: true });
//     setTextInput("");
//   };


//   return (
//     <div className="choice-pair">
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         {content.map((btnContent, btnIndex) => (
//           <div
//             key={btnIndex}
//             className="d-flex flex-column align-items-center"
//             style={{
//               marginRight: btnIndex === 0 ? '2rem' : undefined,
//               marginLeft: btnIndex === 1 ? '2rem' : undefined,
//             }}
//           >
//             <button
//               onClick={() => handleClick(btnIndex)}
//               className={`btn btn-${clicked[btnIndex] ? 'secondary' : 'primary'
//                 } my-1`}
//               style={{
//                 marginBottom: '1.5rem',
//                 whiteSpace: 'normal',
//                 width: '12rem',
//               }}
//             >
//               {btnContent}
//             </button>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 minHeight: '1.5rem',
//               }}
//             >
//               {!clicked[btnIndex] && clicked[1 - btnIndex] && (
//                 <span style={{ color: 'white', fontStyle: 'italic' }}>
//                   This response was not selected
//                 </span>
//               )}
//             </div>
//             {clicked[btnIndex] && (
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 defaultValue="50"
//                 style={{ width: '150px', marginBottom: '1rem' }}
//               />
//             )}
//             {clicked[btnIndex] && (
//               <div
//                 className="input-group mb-3"
//                 style={{ marginTop: '1rem', width: '300px' }}
//               >
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your commentary"
//                   value={textInput}
//                   onChange={handleTextInputChange}
//                 />
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={handleButtonClick}
//                 >
//                   Critique
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// type Node = {
//   level: number;
//   index: number;
//   content: string[];
//   children: any[];
// };

// type MyComponentState = {
//   tree: Node[];
//   critiques: { [key: string]: string };
// };

// class MyComponent extends StreamlitComponentBase<MyComponentState> {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       tree: [
//         {
//           level: 0,
//           index: 0,
//           content: [
//             'Because God said so',
//             'Because of Rayleigh scattering',
//           ],
//           children: [],
//         },
//       ],
//       critiques: {},
//     };
//   }

//   sliceTree = (leafLevel: number) => {
//     this.setState({ tree: this.state.tree.slice(0, leafLevel) });
//   }

//   // updateTree = (level: number, index: number, textInput: string) => {
//   //   const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

//   //   const key = `L${level}I${index}`;
//   //   const critiques = { ...this.state.critiques, [key]: textInput };

//   //   const newNode: Node = {
//   //     level: level + 1,
//   //     index: tree.length,
//   //     content: [
//   //       `Level ${level + 1}, Index ${index * 2} response: ${textInput}`,
//   //       `Level ${level + 1}, Index ${index * 2 + 1} response: ${textInput}`,
//   //     ],
//   //     children: [],
//   //   };

//   //   tree.push(newNode);
//   //   this.setState({ tree, critiques }, () => {
//   //     Streamlit.setComponentValue({ level, index, critique: textInput });
//   //   });
//   // };

//   updateTree = (level: number, index: number, textInput: string) => {
//     const prompt = this.props.args.prompt;
//     const ai_response = this.props.args.ai_response;
//     const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

//     const key = `L${level}I${index}`;
//     const critiques = { ...this.state.critiques, [key]: textInput };

//     const newNode: Node = {
//       level: level + 1,
//       index: tree.length,
//       content: [
//         `Level ${level + 1}, Index ${index * 2} response: ${textInput}`,
//         `Level ${level + 1}, Index ${index * 2 + 1} response: ${this.props.args.ai_response}`,
//         // `Level ${level + 1}, Index ${index * 2 + 1} response: ${textInput}`,
//       ],
//       children: [],
//     };

//     tree.push(newNode);
//     this.setState({ tree, critiques });
//   };


//   render() {
//     const { tree } = this.state;
//     console.log("AI response:", this.props.args.ai_response);

//     return (
//       <div className="container" style={customContainer}>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '2rem',
//           }}
//         >
//           <button
//             style={{
//               backgroundColor: '#007bff',
//               border: '1px solid #007bff',
//               borderRadius: '4px',
//               color: 'white',
//               padding: '0.5rem 1rem',
//               margin: '1rem',
//               pointerEvents: 'none',
//             }}
//           >
//             Why is the sky blue?
//           </button>
//           <div>
//             {tree.map((node, index) => (
//               <div key={index}>
//                 <ChoicePair
//                   level={node.level}
//                   index={node.index}
//                   content={node.content}
//                   updateTree={this.updateTree}
//                   sliceTree={this.sliceTree}
//                 />
//                 {index < tree.length - 1 && <hr />}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withStreamlitConnection(MyComponent);



// import React, { useState } from 'react';
// import {
//   Streamlit, StreamlitComponentBase, withStreamlitConnection
// } from 'streamlit-component-lib';

// const customContainer = {
//   width: '100%',
//   maxWidth: '100%',
//   minHeight: '1000px',
// };

// type ChoicePairProps = {
//   level: number;
//   index: number;
//   content: string[];
//   updateTree: (level: number, index: number, textInput: string) => void;
//   sliceTree: (leafLevel: number) => void;
// };

// const ChoicePair: React.FC<ChoicePairProps> = ({
//   level,
//   index,
//   content,
//   updateTree,
//   sliceTree,
// }) => {
//   const [clicked, setClicked] = useState<boolean[]>([false, false]);
//   const [textInput, setTextInput] = useState<string>('');

//   const handleClick = (btnIndex: number) => {
//     const newClickedState = clicked.map((c, i) => i === btnIndex);
//     setClicked(newClickedState);
//     sliceTree(level + 1);
//     setTextInput('');
//   };

//   const handleTextInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setTextInput(e.target.value);
//   };

//   const handleButtonClick = () => {
//     updateTree(level, index, textInput);
//     setTextInput('');
//   };

//   return (
//     <div className="choice-pair">
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         {content.map((btnContent, btnIndex) => (
//           <div
//             key={btnIndex}
//             className="d-flex flex-column align-items-center"
//             style={{
//               marginRight: btnIndex === 0 ? '2rem' : undefined,
//               marginLeft: btnIndex === 1 ? '2rem' : undefined,
//             }}
//           >
//             <button
//               onClick={() => handleClick(btnIndex)}
//               className={`btn btn-${clicked[btnIndex] ? 'secondary' : 'primary'
//                 } my-1`}
//               style={{
//                 marginBottom: '1.5rem',
//                 whiteSpace: 'normal',
//                 width: '12rem',
//               }}
//             >
//               {btnContent}
//             </button>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 minHeight: '1.5rem',
//               }}
//             >
//               {!clicked[btnIndex] && clicked[1 - btnIndex] && (
//                 <span style={{ color: 'white', fontStyle: 'italic' }}>
//                   This response was not selected
//                 </span>
//               )}
//             </div>
//             {clicked[btnIndex] && (
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 defaultValue="50"
//                 style={{ width: '150px', marginBottom: '1rem' }}
//               />
//             )}
//             {clicked[btnIndex] && (
//               <div
//                 className="input-group mb-3"
//                 style={{ marginTop: '1rem', width: '300px' }}
//               >
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your commentary"
//                   value={textInput}
//                   onChange={handleTextInputChange}
//                 />
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={handleButtonClick}
//                 >
//                   Critique
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// type Node = {
//   level: number;
//   index: number;
//   content: string[];
//   children: any[];
// };

// type MyComponentState = {
//   tree: Node[];
//   critiques: { [key: string]: string };
// };

// class MyComponent extends StreamlitComponentBase<MyComponentState> {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       tree: [
//         {
//           level: 0,
//           index: 0,
//           content: [
//             'Because God said so',
//             'Because of Rayleigh scattering',
//           ],
//           children: [],
//         },
//       ],
//       critiques: {},
//     };
//   }

//   sliceTree = (leafLevel: number) => {
//     this.setState({tree: this.state.tree.slice(0, leafLevel)});
//   }

//   updateTree = (level: number, index: number, textInput: string) => {
//     const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

//     const key = `L${level}I${index}`;
//     const critiques = { ...this.state.critiques, [key]: textInput };

//     const newNode: Node = {
//       level: level + 1,
//       index: tree.length,
//       content: [
//         `Level ${level + 1}, Index ${index * 2} response: ${textInput}`,
//         `Level ${level + 1}, Index ${index * 2 + 1} response: ${textInput}`,
//       ],
//       children: [],
//     };

//     tree.push(newNode);
//     this.setState({ tree, critiques });
//   };

//   render() {
//     const { tree } = this.state;

//     return (
//       <div className="container" style={customContainer}>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '2rem',
//           }}
//         >
//           <button
//             style={{
//               backgroundColor: '#007bff',
//               border: '1px solid #007bff',
//               borderRadius: '4px',
//               color: 'white',
//               padding: '0.5rem 1rem',
//               margin: '1rem',
//               pointerEvents: 'none',
//             }}
//           >
//             Why is the sky blue?
//           </button>
//           <div>
//             {tree.map((node, index) => (
//               <div key={index}>
//                 <ChoicePair
//                   level={node.level}
//                   index={node.index}
//                   content={node.content}
//                   updateTree={this.updateTree}
//                   sliceTree={this.sliceTree}
//                 />
//                 {index < tree.length - 1 && <hr />}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withStreamlitConnection(MyComponent);

