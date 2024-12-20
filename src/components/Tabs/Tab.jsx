export const Tab = ({ children, handleTabChange, id , currentTab  }) => {
  return (
    <li className={currentTab === id ? 'active' : undefined}>
      <button
        type='button'
        onClick={() => {
          handleTabChange(id);
        }}
      >
        {children}
      </button>
    </li>
  );
};
