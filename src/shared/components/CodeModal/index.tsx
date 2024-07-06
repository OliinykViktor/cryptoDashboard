import React, { FC, useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Button, Modal } from 'antd';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';

import { CodeModalProps } from '../../../types';

const CodeModal: FC<CodeModalProps> = ({ isOpenModal, toggleModal }) => {
  const [code, setCode] = useState<string>('');

  const handleChange = (editor: any, data: any, value: string) => {
    setCode(value);
  };

  return (
    <Modal
      title="Edit Code"
      open={isOpenModal}
      onCancel={toggleModal}
      footer={[
        <Button 
          key='black'
          onClick={toggleModal}
        >
          Cancel
        </Button>
      ]}
    >
      <CodeMirror
        value={code}
        options={{ mode: 'javascript', theme: 'material', lineNumbers: true }}
        onChange={handleChange}
      />
    </Modal>
  );
};

export default CodeModal;
