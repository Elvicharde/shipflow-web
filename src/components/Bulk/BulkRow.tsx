import React from 'react';

interface BulkRowProps {
  shipmentId: string;
  shipmentName: string;
  status: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const BulkRow: React.FC<BulkRowProps> = ({ shipmentId, shipmentName, status, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{shipmentId}</td>
      <td>{shipmentName}</td>
      <td>{status}</td>
      <td>
        <button onClick={() => onEdit(shipmentId)}>Edit</button>
        <button onClick={() => onDelete(shipmentId)}>Delete</button>
      </td>
    </tr>
  );
};

export default BulkRow;