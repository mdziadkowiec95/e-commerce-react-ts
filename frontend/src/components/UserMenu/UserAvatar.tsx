import React from 'react';

interface Props {
  firstName?: string;
  lastName?: string;
}

const UserAvatar = ({ firstName, lastName }: Props) => {
  const getAvtarInitials = (
    fName?: string,
    lName?: string
  ): JSX.Element | null => {
    if (fName && lName)
      return (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            border: '50%',
            width: '40px',
            height: '40px',
            background: 'cadetblue',
            color: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {fName.charAt(0)}
          {lName.charAt(0)}
        </div>
      );

    return null;
  };
  return getAvtarInitials(firstName, lastName);
};

export default UserAvatar;
