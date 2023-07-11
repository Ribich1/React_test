import ColorPicker from './Counter/ColorPicker';
import Counter from './Counter/Counter';
import Dropdown from './Counter/Dropdown/Dropdown';

const colorPickerOptions=[
{label:'red', color:'#F44336'},
{label:'green', color:'#4caf50'},
{label:'blue', color:'#2196f3'},
{label:'grey', color:'#607d8b'},
{label:'pink', color:'#e91e63'},
{label:'indigo', color:'#3f51b5'},
];


export const App = () => {
  return (
    <>
      <h1>Состояние компонента</h1>
      {/* <Dropdown /> */}
      {/* <Counter   /> */}
      <ColorPicker options={colorPickerOptions} defaultIdx={3}/>
    </>
  );
};
