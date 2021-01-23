/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Form, Button } from "react-bootstrap";

//import DragScaleBar from 'react-drag-scale-bar'
// import { Container } from './styles';

const EditSub: React.FC = ({ sub, setSub }) => {
  return (
    <Form>
      <Form.Group controlId="formX">
        <Form.Label>Index</Form.Label>
        <Form.Control type="number" min="0" step="1" placeholder="index" />
      </Form.Group>

      <Form.Group controlId="formX">
        <Form.Label>X axis</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="100"
          step="0.01"
          placeholder="X"
        />
      </Form.Group>

      <Form.Group controlId="formY">
        <Form.Label>Y axis</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="100"
          step="0.01"
          placeholder="Y"
        />
      </Form.Group>
      <Form.Group controlId="formY">
        <Form.Label>Size</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="100"
          step="0.01"
          placeholder="size"
        />
      </Form.Group>
      <Form.Group controlId="formY">
        <Form.Label>Width</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="100"
          step="0.01"
          placeholder="width"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditSub;
