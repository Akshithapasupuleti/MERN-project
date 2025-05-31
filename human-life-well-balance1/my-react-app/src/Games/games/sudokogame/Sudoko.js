import './Sudoko.css';
import {useState} from 'react';
const initial=[
    [-1,5,-1,9,-1,-1,-1,-1,-1],
    [8,-1,-1,-1,4,-1,3,-1,7],
    [-1,-1,-1,2,8,-1,1,9,-1],
    [5,3,8,6,-1,7,9,4,-1],
    [-1,2,-1,3,-1,1,-1,-1,-1],
    [1,-1,9,8,-1,4,6,2,3],
    [9,-1,7,4,-1,-1,-1,-1,-1],
    [-1,4,5,-1,-1,-1,2,-1,9],
    [-1,-1,-1,-1,3,-1,-1,7,-1]

];
export default function Sudoku()
{
    const [sudokuArr,setSudoArr]=useState(getDeepCopy(initial));

    function getDeepCopy(arr){
        return JSON.parse(JSON.stringify(arr));
    }

    function onInputChange(e,row,col){
        var val=parseInt(e.target.value) || -1,grid=getDeepCopy(initial);
        if(val===-1 || val>=1 && val<=9)
            {
              grid[row][col]=val;
           }
        setSudoArr(grid)
    }

   function compareSudokus(currentSudoku,solvedSudoku)
   {
        let result={
            isComeplete:true,
            isSolvable:true
        }
        for(var i=0;i<9;i++)
            {
                for(var j=0;j<9;j++)
                    {
                        if(currentSudoku[i][j]!==solvedSudoku[i][j])
                            {
                                    if(currentSudoku[i][j]!==-1)
                                        {
                                            result.isSolvable=false;
                                        }
                                        resetSudoku.isComeplete=false;
                            }
                    }
            }
            return result;
   }

    function checkSudoku(){
        let sudoku=getDeepCopy(initial);
        solver(sudoku)
        let compare =compareSudokus(sudokuArr,sudoku);
        if(compare.isComeplete)
            {
                alert("Congratulations");
            }
            else if(compare.isSolvable)
                {
                    alert("kepp moving on");
                }
                else{
                    alert("sudoku can not be solved try again");
                }
    }
    function checkRow(grid,row,col,num)
    {
        return grid[row].indexOf(num)===-1;
    }
    function checkCol(grid,row,col,num)
    {
        return grid.map(row=> row[col]).indexOf(num)===-1;
    }
    function checkBox(grid,row,col,num)
    {
        let boxArr=[],rowStart=row-(row%3),colStart=col-(col%3);
        for(let i=0;i<3;i++)
            {
                for(let j=0;j<3;j++)
                    {
                        boxArr.push(grid[rowStart+1][colStart+1])
                    }
            }
            return boxArr.indexOf(num)===-1;
    }
    function checkValid(grid,row,col,num)
    {   //num should be unique in row column sqaure
        if(checkRow(grid,row,col,num)&&checkCol(grid,row,col,num)&&checkBox(grid,row,col,num))
            {
                return true;
            }
            return false;
        
    }
    function getNext(row,col)
    {   //if col reaches 8 increase row number
        //if row reaches 8 col reaches 8 ,next will be 8
        //if col does doesn't reach 8 increase col
        return col!==8?[row,col+1]:row!=8?[row+1,0]:[0,0];
    }
    function solver(grid,row=0,col=0)
    {
        //if the current cell is already filled move to the next cell
        if(grid[row][col]!=-1)
            {
                //for last cell don't solve it 
                let isLast=row>=8 && col>=8;
                if(!isLast)
                    {   let [newRow,newCol]=getNext(row,col);
                        return solver(grid,newRow,newCol)
                    }
                
            }
        for(let num1=1;num1<=9;num1++)
            {
                //check if this is satisfying sudoku constraints
                if(checkValid(grid,row,col,num1))
                    {
                        grid[row][col]=num1;
                        setSudoArr(grid);
                        let [newRow,newCol]=getNext(row,col);
                     
                        if(!newRow && !newCol)
                            {
                                return true;
                            }

                            if(solver(grid,newRow,newCol)){
                                return true
                            }
                    }
            }
            grid[row][col]=-1;
            setSudoArr(grid);
            return false;
    }
    function solveSudoku(){
        let sudoku=getDeepCopy(initial)
        solver(sudoku)
    }
    function resetSudoku(){
        let sudoku=getDeepCopy(initial)
        setSudoArr(sudoku);
    }





    return (
        <div className="App">
            <div className="App-header">
                <h3>Sudoku Solver</h3>
                <table>
                    <tbody>
                        {
                            [0,1,2,3,4,5,6,7,8].map((row,rIndex)=>{
                                return <tr key={rIndex} className={((row+1) %3) === 0?'bBorder':''}>
                                    {
                                        [0,1,2,3,4,5,6,7,8].map((col,cIndex)=>{
                                          return  <td key={rIndex+cIndex} className={((col+1)%3)===0?'rBorder':''}>
                                            <input 
                                            onChange={(e)=>onInputChange(e,row,col)} className="cellInput" 
                                            value={sudokuArr[row][col]===-1?'':sudokuArr[row][col]} 
                                            disabled={initial[row][col]!==-1} 
                                            />
                                            </td>       
                                        })
                                    }
                                </tr>
                            })
                        }
                        
                    </tbody>
                </table>
                <div className="buttonContainer">
                    <button className='checkButton' onClick={checkSudoku}>Check</button>
                    <button className='solveButton' onClick={solveSudoku}>Solve</button>
                    <button className='resetButton' onClick={resetSudoku}>Reset</button>
                </div>
            </div>
        </div>
    )
}
