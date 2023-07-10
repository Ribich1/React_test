import Counter from './Counter/Counter';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // fontSize: 40,
     

        color: '#010101',

      }}
    >
      <h1>Состояние компонента</h1>
      <Counter   />
    </div>
  );
};
