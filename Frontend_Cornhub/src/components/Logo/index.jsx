import { Link } from 'react-router-dom';
import Image from 'next/image';

export default function Logo(props){
  const { variant } = props;

  const variants = {
    main: {
      width: 180,
      height: 70,
    },
    header: {
      width: 150,
      height: 40,
    },
    'header-md': {
      width: 145,
      height: 35,
    },
    footer: {
      width: 180,
      height: 50,
    },
  };

  return (
    <div className={variant === 'header' && 'mt-2'}>
      <Link to='/'>
        <a>
          <Image
            src=''
            alt='CornHub'
            {...variants[variant]}
          />
        </a>
      </Link>
    </div>
  );
};