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
};

const ChoicePair: React.FC<ChoicePairProps> = ({
  level,
  index,
  content,
  updateTree,
  sliceTree,
}) => {
  const [clicked, setClicked] = useState<boolean[]>([false, false]);
  const [textInput, setTextInput] = useState<string>('');

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
              {btnContent}
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
    this.setState({tree: this.state.tree.slice(0, leafLevel)});
  }

  updateTree = (level: number, index: number, textInput: string) => {
    const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

    const key = `L${level}I${index}`;
    const critiques = { ...this.state.critiques, [key]: textInput };

    const newNode: Node = {
      level: level + 1,
      index: tree.length,
      content: [
        `Level ${level + 1}, Index ${index * 2} response: ${textInput}`,
        `Level ${level + 1}, Index ${index * 2 + 1} response: ${textInput}`,
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
// };

// const ChoicePair: React.FC<ChoicePairProps> = ({
//   level,
//   index,
//   content,
//   updateTree,
// }) => {
//   const [clicked, setClicked] = useState<boolean[]>([false, false]);
//   const [textInput, setTextInput] = useState<string>('');

//   const handleClick = (btnIndex: number) => {
//     const newClickedState = clicked.map((c, i) => i === btnIndex);
//     setClicked(newClickedState);
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
//               className={`btn btn-${clicked[btnIndex] ? 'secondary' : 'primary'} my-1`}
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
//   children: any[]; // Update with the proper type if possible.
// };

// type MyComponentState = {
//   tree: Node[];
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
//             'Because of Raleigh scattering',
//           ],
//           children: [],
//         },
//       ],
//     };
//   }

//   updateTree = (level: number, index: number, textInput: string) => {
//     const tree = JSON.parse(JSON.stringify(this.state.tree)) as Node[];

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
//     this.setState({ tree });
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


// // // import React, { ReactNode } from 'react';
// // // import {
// // //     Streamlit, StreamlitComponentBase, withStreamlitConnection
// // // } from 'streamlit-component-lib';

// // // interface State {
// // //   prompt: string;
// // //   tree: (string | string[][])[][];
// // //   clicked: boolean[][];
// // // }

// // // const customContainer = {
// // //   width: '100%',
// // //   maxWidth: '100%',
// // //   minHeight: '1000px',
// // // };

// // // class MyComponent extends StreamlitComponentBase<State> {
// // //   public state: State = {
// // //     prompt: 'Why is the sky blue?',
// // //     tree: [
// // //       [
// // //         ['Because God said so', []],
// // //         ['Because of Raleigh scattering', []],
// // //       ],
// // //     ],
// // //     clicked: [],
// // //   };

// // //   private addToTree = (level: number, index: number, text: string, newNodes: string[][]) => {
// // //     const tree = JSON.parse(JSON.stringify(this.state.tree)) as (string | string[][])[][][];
// // //     tree[level] = tree[level] || [];
// // //     tree[level][index] = [text, newNodes];
// // //     this.setState({ tree });
// // //   };


// // //   private handleClick = (level: number, index: number) => {
// // //     const clicked = JSON.parse(JSON.stringify(this.state.clicked)) as boolean[][];
// // //     clicked[level] = clicked[level] || [];

// // //     if (clicked[level][index]) {
// // //       clicked[level][index] = false;
// // //     } else {
// // //       clicked[level][index] = true;
// // //       clicked[level][1 - index] = false;
// // //     }

// // //     this.setState({ clicked }, () => {
// // //       // If a button is unclicked, clear the input field associated with that button
// // //       const unclickedInput = document.getElementById(
// // //         `inputDefault_${level}_${index}`
// // //       ) as HTMLInputElement;
// // //       if (unclickedInput) {
// // //         unclickedInput.value = '';
// // //       }
// // //     });
// // //   };





// // //   private renderNode = (level: number, index: number) => {
// // //     const content = this.state.tree[level]?.[index]?.[0];
// // //     const isClicked = this.state.clicked[level]?.[index];
// // //     const otherButtonClicked = this.state.clicked[level]?.[1 - index];

// // //     if (content) {
// // //       return (
// // //         <div className="d-flex flex-column align-items-center" style={{ marginRight: index === 0 ? '2rem' : undefined, marginLeft: index === 1 ? '2rem' : undefined }}>
// // //           <button
// // //             onClick={() => {
// // //               this.handleClick(level, index);
// // //             }}
// // //             className={`btn btn-${isClicked ? 'secondary' : 'primary'} my-1`}
// // //             style={{ marginBottom: '1.5rem', whiteSpace: 'normal', width: '12rem' }}
// // //           >
// // //             {content}
// // //           </button>
// // //           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '1.5rem' }}>
// // //             {!isClicked && otherButtonClicked && (
// // //               <span style={{ color: 'white', fontStyle: 'italic' }}>
// // //                 This response was not selected
// // //               </span>
// // //             )}
// // //           </div>
// // //         </div>
// // //       );
// // //     }
// // //     return null;
// // //   };

// // //   private generateNewNodes = (level: number, index: number) => {
// // //     if (level === 0) {
// // //       if (index === 0) {
// // //         return [
// // //           ["God wanted us to be happy, and he made the sky to give us light and food"],
// // //           ["God made the sky and gave it the color he deemed most beneficial for mankind"]
// // //         ];
// // //       } else {
// // //         return [
// // //           ["Rayleigh scattering is a scientific process that leads to the sky appearing blue"],
// // //           ["Rayleigh scattering is the primary scientific reasoning that on most days, the sky appears blue"]
// // //         ];
// // //       }
// // //     } else {
// // //       return [
// // //         [`Level ${level + 1}, Index ${index * 2} response`],
// // //         [`Level ${level + 1}, Index ${index * 2 + 1} response`]
// // //       ];
// // //     }
// // //   };

// // //   private renderTextInput = (level: number, index: number) => {
// // //     const isClicked = this.state.clicked[level]?.[index];

// // //     const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
// // //       if (event.key === 'Enter') {
// // //         const commentary = event.currentTarget.value;
// // //         this.handleClick(level, index);

// // //         // Generate new nodes without modifying the current node text
// // //         const newNodes = this.generateNewNodes(level, index);

// // //         this.addToTree(level + 1, index * 2, newNodes[0][0], []);
// // //         this.addToTree(level + 1, index * 2 + 1, newNodes[1][0], []);
// // //       }
// // //     };

// // //     const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
// // //       const commentary = (event.currentTarget.previousSibling as HTMLInputElement).value;

// // //       const clicked = [...this.state.clicked] as boolean[][];
// // //       clicked[level] = clicked[level] || [];
// // //       clicked[level][index] = true;
// // //       clicked[level][1 - index] = false;

// // //       const tree = JSON.parse(JSON.stringify(this.state.tree)) as (string | string[][])[][][];

// // //       let newNodes: string[][] = [];

// // //       if (level === 0) {
// // //         if (index === 0) {
// // //           newNodes = [
// // //             ["God wanted us to be happy, and he made the sky to give us light and food"],
// // //             ["God made the sky and gave it the color he deemed most beneficial for mankind"]
// // //           ];
// // //         } else {
// // //           newNodes = [
// // //             ["Rayleigh scattering is a scientific process that leads to the sky appearing blue"],
// // //             ["Rayleigh scattering is the primary scientific reasoning that on most days, the sky appears blue"]
// // //           ];
// // //         }
// // //       } else {
// // //         newNodes = [
// // //           [`Level ${level + 1}, Index ${index * 2} response`],
// // //           [`Level ${level + 1}, Index ${index * 2 + 1} response`]
// // //         ];
// // //       }

// // //       tree[level + 1] = tree[level + 1] || [];
// // //       tree[level + 1][index * 2] = [newNodes[0][0], []];
// // //       tree[level + 1][index * 2 + 1] = [newNodes[1][0], []];

// // //       this.setState({ clicked, tree });
// // //     };


// // //     if (isClicked) {
// // //       return (
// // //         <div className="input-group mb-3" style={{ marginTop: '1rem', width: '300px' }}>
// // //           <input
// // //             type="text"
// // //             className="form-control"
// // //             placeholder="Enter your commentary"
// // //             id={`inputDefault_${level}_${index}`}
// // //             onKeyPress={handleKeyPress}
// // //           />
// // //           <button
// // //             className="btn btn-primary"
// // //             type="button"
// // //             id={`button-addon2_${level}_${index}`}
// // //             onClick={handleButtonClick} // Add this line back
// // //           >
// // //             Critique
// // //           </button>
// // //         </div>
// // //       );
// // //     }
// // //     return null;
// // //   };


// // //   public render = (): ReactNode => {
// // //     const renderDividerAndNewNodes = (level: number, index: number) => {
// // //       const isClicked = this.state.clicked[level]?.[index];
// // //       const newNodesExist = this.state.tree[level + 1]?.[index * 2]?.[0];

// // //       if (isClicked && newNodesExist) {
// // //         return (
// // //           <React.Fragment>
// // //             <hr />
// // //             <div
// // //               style={{
// // //                 display: 'flex',
// // //                 justifyContent: 'center',
// // //                 alignItems: 'flex-end',
// // //                 marginTop: '2rem',
// // //                 flexWrap: 'wrap',
// // //               }}
// // //             >
// // //               <div className="d-flex flex-column align-items-center">
// // //                 {this.renderNode(level + 1, index * 2)}
// // //                 <input
// // //                   type="range"
// // //                   min="0"
// // //                   max="100"
// // //                   defaultValue="50"
// // //                   style={{ width: '150px', marginTop: '1rem' }}
// // //                 />
// // //                 {this.renderTextInput(level + 1, index * 2)}
// // //               </div>
// // //               <div className="d-flex flex-column align-items-center">
// // //                 {this.renderNode(level + 1, index * 2 + 1)}
// // //                 <input
// // //                   type="range"
// // //                   min="0"
// // //                   max="100"
// // //                   defaultValue="50"
// // //                   style={{ width: '150px', marginTop: '1rem' }}
// // //                 />
// // //                 {this.renderTextInput(level + 1, index * 2 + 1)}
// // //               </div>
// // //             </div>
// // //           </React.Fragment>
// // //         );
// // //       }
// // //       return null;
// // //     };

// // //     return (
// // //       <div className="container" style={customContainer}>
// // //         <div
// // //           style={{
// // //             display: 'flex',
// // //             flexDirection: 'column',
// // //             alignItems: 'center',
// // //             marginTop: '2rem',
// // //           }}
// // //         >
// // //           <button
// // //             style={{
// // //               backgroundColor: '#007bff',
// // //               border: '1px solid #007bff',
// // //               borderRadius: '4px',
// // //               color: 'white',
// // //               padding: '0.5rem 1rem',
// // //               margin: '1rem',
// // //               pointerEvents: 'none',
// // //             }}
// // //           >
// // //             {this.state.prompt}
// // //           </button>
// // //           <div
// // //             style={{
// // //               display: 'flex',
// // //               justifyContent: 'center',
// // //               alignItems: 'flex-end',
// // //               marginTop: '2rem',
// // //               flexWrap: 'wrap',
// // //             }}
// // //           >
// // //             <div style={{ display: 'flex', marginLeft: '-12rem', marginRight: '-12rem', flexWrap: 'wrap' }}>
// // //               <div className="d-flex flex-column align-items-center">
// // //                 {this.renderNode(0, 0)}
// // //                 <input
// // //                   type="range"
// // //                   min="0"
// // //                   max="100"
// // //                   defaultValue="50"
// // //                   style={{ width: '150px', marginTop: '1rem' }}
// // //                 />
// // //                 {this.renderTextInput(0, 0)}
// // //                 {renderDividerAndNewNodes(0, 0)}
// // //               </div>
// // //               <div className="d-flex flex-column align-items-center">
// // //                 {this.renderNode(0, 1)}
// // //                 <input
// // //                   type="range"
// // //                   min="0"
// // //                   max="100"
// // //                   defaultValue="50"
// // //                   style={{ width: '150px', marginTop: '1rem' }}
// // //                 />
// // //                 {this.renderTextInput(0, 1)}
// // //                 {renderDividerAndNewNodes(0, 1)}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };
// // // }

// // // export default withStreamlitConnection(MyComponent);


// // // // // import React, { ReactNode } from 'react';
// // // // // import {
// // // // //     Streamlit, StreamlitComponentBase, withStreamlitConnection
// // // // // } from 'streamlit-component-lib';

// // // // // interface State {
// // // // //   prompt: string;
// // // // //   tree: (string | string[][])[][];
// // // // //   clicked: boolean[][];
// // // // // }

// // // // // const customContainer = {
// // // // //   width: '100%',
// // // // //   maxWidth: '100%',
// // // // //   minHeight: '1000px',
// // // // // };

// // // // // class MyComponent extends StreamlitComponentBase<State> {
// // // // //   public state: State = {
// // // // //     prompt: 'Why is the sky blue?',
// // // // //     tree: [
// // // // //       [
// // // // //         ['Because God said so', []],
// // // // //         ['Because of Raleigh scattering', []],
// // // // //       ],
// // // // //     ],
// // // // //     clicked: [],
// // // // //   };

// // // // //   private addToTree = (level: number, index: number, text: string, newNodes: string[][]) => {
// // // // //     const tree = JSON.parse(JSON.stringify(this.state.tree)) as (string | string[][])[][][];
// // // // //     tree[level] = tree[level] || [];
// // // // //     tree[level][index] = [text, newNodes];
// // // // //     this.setState({ tree });
// // // // //   };

// // // // //   private handleClick = (level: number, index: number) => {
// // // // //     const clicked = [...this.state.clicked] as boolean[][];
// // // // //     clicked[level] = clicked[level] || [];
// // // // //     clicked[level][index] = true;
// // // // //     clicked[level][1 - index] = false;
// // // // //     this.setState({ clicked });
// // // // //   };

// // // // //   private renderNode = (level: number, index: number) => {
// // // // //     const content = this.state.tree[level]?.[index]?.[0];
// // // // //     const isClicked = this.state.clicked[level]?.[index];
// // // // //     const otherButtonClicked = this.state.clicked[level]?.[1 - index];

// // // // //     if (content) {
// // // // //       return (
// // // // //         <div className="d-flex flex-column align-items-center" style={{ marginRight: index === 0 ? '2rem' : undefined, marginLeft: index === 1 ? '2rem' : undefined }}>
// // // // //           <button
// // // // //             onClick={() => {
// // // // //               this.handleClick(level, index);
// // // // //             }}
// // // // //             className={`btn btn-${isClicked ? 'secondary' : 'primary'} my-1`}
// // // // //             style={{ marginBottom: '1.5rem', whiteSpace: 'normal', width: '12rem' }} // Add white-space and width styles
// // // // //           >
// // // // //             {content}
// // // // //           </button>
// // // // //           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '1.5rem' }}>
// // // // //             {!isClicked && otherButtonClicked && (
// // // // //               <span style={{ color: 'white', fontStyle: 'italic' }}>
// // // // //                 This response was not selected
// // // // //               </span>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       );
// // // // //     }
// // // // //     return null;
// // // // //   };

// // // // //   private renderTextInput = (level: number, index: number) => {
// // // // //     const isClicked = this.state.clicked[level]?.[index];

// // // // //     const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
// // // // //       if (event.key === 'Enter') {
// // // // //         const commentary = event.currentTarget.value;
// // // // //         this.handleClick(level, index);
// // // // //         this.addToTree(level + 1, index * 2, commentary, []);
// // // // //       }
// // // // //     };

// // // // //     const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
// // // // //       const commentary = (event.currentTarget.previousSibling as HTMLInputElement).value;

// // // // //       const clicked = [...this.state.clicked] as boolean[][];
// // // // //       clicked[level] = clicked[level] || [];
// // // // //       clicked[level][index] = true;
// // // // //       clicked[level][1 - index] = false;

// // // // //       const tree = JSON.parse(JSON.stringify(this.state.tree)) as (string | string[][])[][][];
// // // // //       const newNodes = level === 0
// // // // //         ? index === 0
// // // // //           ? [
// // // // //             ["God wanted us to be happy, and he made the sky to give us light and food"],
// // // // //             ["God made the sky and gave it the color he deemed most beneficial for mankind"]
// // // // //           ]
// // // // //           : [
// // // // //             ["Rayleigh scattering is a scientific process that leads to the sky appearing blue"],
// // // // //             ["Rayleigh scattering is the primary scientific reasoning that on most days, the sky appears blue"]
// // // // //           ]
// // // // //         : []; // For deeper levels, you can add more new nodes here

// // // // //       tree[level + 1] = tree[level + 1] || [];
// // // // //       tree[level + 1][index * 2] = [newNodes[0], []];
// // // // //       tree[level + 1][index * 2 + 1] = [newNodes[1], []];

// // // // //       this.setState({ clicked, tree });
// // // // //     };

// // // // //     if (isClicked) {
// // // // //       return (
// // // // //         <div className="input-group mb-3" style={{ marginTop: '1rem', width: '300px' }}>
// // // // //           <input
// // // // //             type="text"
// // // // //             className="form-control"
// // // // //             placeholder="Enter your commentary"
// // // // //             id={`inputDefault_${level}_${index}`}
// // // // //             onKeyPress={handleKeyPress}
// // // // //           />
// // // // //           <button
// // // // //             className="btn btn-primary"
// // // // //             type="button"
// // // // //             id={`button-addon2_${level}_${index}`}
// // // // //             onClick={handleButtonClick}
// // // // //           >
// // // // //             Critique
// // // // //           </button>
// // // // //         </div>
// // // // //       );
// // // // //     }
// // // // //     return null;
// // // // //   };

// // // // //   public render = (): ReactNode => {
// // // // //     const renderDividerAndNewNodes = (level: number, index: number) => {
// // // // //       const isClicked = this.state.clicked[level]?.[index];
// // // // //       const newNodesExist = this.state.tree[level + 1]?.[index * 2]?.[0];

// // // // //       if (isClicked && newNodesExist) {
// // // // //         return (
// // // // //           <React.Fragment>
// // // // //             <hr />
// // // // //             <div
// // // // //               style={{
// // // // //                 display: 'flex',
// // // // //                 justifyContent: 'center',
// // // // //                 alignItems: 'flex-end',
// // // // //                 marginTop: '2rem',
// // // // //                 flexWrap: 'wrap', // Add flex-wrap style
// // // // //               }}
// // // // //             >
// // // // //               <div className="d-flex flex-column align-items-center">
// // // // //                 {this.renderNode(level + 1, index * 2)}
// // // // //                 <input
// // // // //                   type="range"
// // // // //                   min="0"
// // // // //                   max="100"
// // // // //                   defaultValue="50"
// // // // //                   style={{ width: '150px', marginTop: '1rem' }}
// // // // //                 />
// // // // //                 {this.renderTextInput(level + 1, index * 2)}
// // // // //               </div>
// // // // //               <div className="d-flex flex-column align-items-center">
// // // // //                 {this.renderNode(level + 1, index * 2 + 1)}
// // // // //                 <input
// // // // //                   type="range"
// // // // //                   min="0"
// // // // //                   max="100"
// // // // //                   defaultValue="50"
// // // // //                   style={{ width: '150px', marginTop: '1rem' }}
// // // // //                 />
// // // // //                 {this.renderTextInput(level + 1, index * 2 + 1)}
// // // // //               </div>
// // // // //             </div>
// // // // //           </React.Fragment>
// // // // //         );
// // // // //       }
// // // // //       return null;
// // // // //     };

// // // // //     return (
// // // // //       <div className="container" style={customContainer}>
// // // // //         <div
// // // // //           style={{
// // // // //             display: 'flex',
// // // // //             flexDirection: 'column',
// // // // //             alignItems: 'center',
// // // // //             marginTop: '2rem',
// // // // //           }}
// // // // //         >
// // // // //           <button
// // // // //             style={{
// // // // //               backgroundColor: '#007bff',
// // // // //               border: '1px solid #007bff',
// // // // //               borderRadius: '4px',
// // // // //               color: 'white',
// // // // //               padding: '0.5rem 1rem',
// // // // //               margin: '1rem',
// // // // //               pointerEvents: 'none',
// // // // //             }}
// // // // //           >
// // // // //             {this.state.prompt}
// // // // //           </button>
// // // // //           <div
// // // // //             style={{
// // // // //               display: 'flex',
// // // // //               justifyContent: 'center',
// // // // //               alignItems: 'flex-end',
// // // // //               marginTop: '2rem',
// // // // //               flexWrap: 'wrap', // Add flex-wrap style
// // // // //             }}
// // // // //           >
// // // // //             <div style={{ display: 'flex', marginLeft: '-12rem', marginRight: '-12rem', flexWrap: 'wrap' }}>
// // // // //               <div className="d-flex flex-column align-items-center">
// // // // //                 {this.renderNode(0, 0)}
// // // // //                 <input
// // // // //                   type="range"
// // // // //                   min="0"
// // // // //                   max="100"
// // // // //                   defaultValue="50"
// // // // //                   style={{ width: '150px', marginTop: '1rem' }}
// // // // //                 />
// // // // //                 {this.renderTextInput(0, 0)}
// // // // //                 {renderDividerAndNewNodes(0, 0)}
// // // // //               </div>
// // // // //               <div className="d-flex flex-column align-items-center">
// // // // //                 {this.renderNode(0, 1)}
// // // // //                 <input
// // // // //                   type="range"
// // // // //                   min="0"
// // // // //                   max="100"
// // // // //                   defaultValue="50"
// // // // //                   style={{ width: '150px', marginTop: '1rem' }}
// // // // //                 />
// // // // //                 {this.renderTextInput(0, 1)}
// // // // //                 {renderDividerAndNewNodes(0, 1)}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   };
// // // // // }

// // // // // export default withStreamlitConnection(MyComponent);
