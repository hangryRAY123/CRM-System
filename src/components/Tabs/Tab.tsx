import React from 'react';

export const Tab: React.FC<{
  handleTabChange: (tab: string) => void;
  currentTab: string;
  id: string;
  children: React.ReactNode;
}> = (props) => {
  return (
    <li className={props.currentTab === props.id ? 'active' : undefined}>
      <button
        type='button'
        onClick={() => {
          props.handleTabChange(props.id);
        }}
      >
        {props.children}
      </button>
    </li>
  );
};
