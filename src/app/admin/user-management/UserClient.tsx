'use client';

import { Account } from '@prisma/client';
import { Table } from 'react-bootstrap';

interface Props {
  accounts: Account[];
}

export default function UserClient({ accounts }: Props) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Privilege</th>
          <th>Name</th>
          <th>Promote/Demote Admin</th>
          <th>Delete User</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map(account => (
          <tr key={account.AccountID}>
            <td>{account.AccountID}</td>
            <td>{account.Username}</td>
            <td>{account.EmailAddress}</td>
            <td>{account.Privilege}</td>
            <td>
              {account.FirstName}
              {' '}
              {account.LastName}
            </td>
            <td>
              <button type="button" className="btn btn-primary btn-sm">Promote/Demote</button>
            </td>
            <td>
              <button type="button" className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
