import clsx from 'clsx';
import { Children, Fragment } from 'react';

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);

  return (
    <div className='flex gap-3 w-full'>
      {childrenArray.map((child, index) => {
        const isLastChild = index === childrenArray.length - 1;
        return (
          <Fragment key={index}>
            <div className={clsx('', { 'text-gray-500': !isLastChild })}>
              {child}
            </div>
            {!isLastChild && <p>/</p>}
          </Fragment>
        )
      })}
    </div>
  );
};


export default Breadcrumb;
