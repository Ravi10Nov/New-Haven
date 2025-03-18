import React from 'react';
import './BreadCrumbJs.css';

const breadCrumDiv = {
  paddingLeft: '35px',
  background: 'white',
  margin: 0,
  maxWidth: '100%',
};
const breadcrumb = {
  color: '#8C8C8C',
  alignItem: 'center',
};
const breadBtn = {
  textDecoration: 'none',
  border: 'none',
  outline: 'none',
  background: 'none',
};

export default function BreadCrumbJs(props) {
  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  return (
    <nav
      className='breadDiv row justify-content-center container'
      style={breadCrumDiv}>
      <ol className='breadcrumb' style={breadcrumb}>
        {props.crumbs.map((crumb, ci) => {
          const disabled = isLast(ci) ? 'disabled' : '';
          return (
            <li key={ci} className='breadcrumb-item align-item-center'>
              <button
                className={`btn-link ${disabled}`}
                style={breadBtn}
                onClick={() => props.selected(crumb)}>
                {crumb}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
