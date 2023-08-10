import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import './styles.css';

import App from './App';
function Square({ value,onsquareclick }) {
  return <button className="square" onClick={onsquareclick}>{value}</button>;
}
 function Board({zero,squares,onplay}) {
   // const [squares, setSquares] = useState(Array(9).fill(null));
   // const[zero,setzero]=useState(true);
    function handleclick(i)
    {
        if(squares[i]||winnercalc(squares))return;
        
        const nextsquare=squares.slice();
        if(zero)nextsquare[i]='O';
        else nextsquare[i]='X';

        // setSquares(nextsquare);
        // setzero(!zero);
        onplay(nextsquare);

    }
    const winner=winnercalc(squares);
    let status,c=0;
  if (winner) {
    
    status = 'Winner: ' + winner;
  } else {
    c++;
    if(c==9)status='draw'
    else
    status = 'Next player: ' + (zero ? 'O' : 'X');
  }


    return (
      <>
        <div className="board-row">
        <div className="status">{status}</div>
          <Square value={squares[0]} onsquareclick={()=>handleclick(0)} />
          <Square value={squares[1]}  onsquareclick={()=>handleclick(1)}/>
          <Square value={squares[2]}  onsquareclick={()=>handleclick(2)}/>
        </div>
        <div className="board-row">
          <Square value={squares[3]}  onsquareclick={()=>handleclick(3)}/>
          <Square value={squares[4]}  onsquareclick={()=>handleclick(4)}/>
          <Square value={squares[5]}  onsquareclick={()=>handleclick(5)}/>
        </div>
        <div className="board-row">
          <Square value={squares[6]}  onsquareclick={()=>handleclick(6)}/>
          <Square value={squares[7]}  onsquareclick={()=>handleclick(7)}/>
          <Square value={squares[8]}  onsquareclick={()=>handleclick(8)}/>
        </div>
      </>
    );
  }
  export default function Game()
  {
       const[zero,setzero]=useState(true);
       const[history,sethistory]=useState([Array(9).fill(null)]);
       const currentsquare=history[history.length-1];
       function handleplay(nextsquare){
        sethistory([...history,nextsquare]);
        setzero(!zero);
       }
       function jumpto(nextmove){
        
       }
       const moves=history.map((squares,move)=>{
        let description;
        if(move>0)description='go to move #'+move;
        else description='go to game start';
        return (
          <li>
            <button onClick={()=>jumpto(move)}>
              {description}
            </button>
          </li>

        )
       })
       return(
        <div className='game'>
          <div className='game-board'>
            <Board zero={zero} squares={currentsquare} onplay={handleplay}/>

          </div>
          <div className='game-info'>
            <ol>
              {moves}
            </ol>
          </div>
        </div>
       )






  }
  

  function winnercalc(squares)
  {
    const line=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
        ];
        for(let i=0;i<line.length;++i){
            const [a,b,c]=line[i];
            if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c])return squares[a];


        }
        return null;  

  }
    
