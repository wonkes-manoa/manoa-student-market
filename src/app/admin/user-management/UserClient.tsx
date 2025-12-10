'use client';

import { useState } from 'react';
import { Table, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

type IsAdmin = {
  AccountID: number;
  Username: string;
  EmailAddress: string;
  Privilege: string;
  FirstName: string;
  LastName: string;
  _count: {
    merch: number;
  };
};

interface Props {
  accounts: IsAdmin[];
  userId: number;
}

export default function UserClient({ accounts, userId }: Props) {
  const [showToastDelete, setShowToastDelete] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<IsAdmin | null>(null);
  const [accountList, setAccountList] = useState(accounts);

  const handleDeleteClick = (account: IsAdmin) => {
    setSelectedAccount(account);
    setShowToastDelete(true);
  };

  const confirmDelete = async () => {
    if (!selectedAccount) return;
    await fetch('/api/accounts/delete/user', {
      method: 'POST',
      body: JSON.stringify({ accountId: selectedAccount.AccountID }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    setAccountList(prev => prev.filter(a => a.AccountID !== selectedAccount.AccountID));
    setShowToastDelete(false);
  };

  const handlePrivilegeToggle = async (account: IsAdmin) => {
    const newPrivilege = account.Privilege === 'ADMIN' ? 'USER' : 'ADMIN';

    try {
      const res = await fetch('/api/accounts/update-privilege', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: account.AccountID, newPrivilege }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      // Update UI immediately
      setAccountList(prev => prev.map(a => (a.AccountID === account.AccountID
        ? { ...a, Privilege: newPrivilege } : a
      )));
    } catch (err) {
      console.error('Failed to update privilege', err);
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Privilege</th>
            <th>Name</th>
            <th>Posts</th>
            <th>Change Privilage</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {accountList.map(account => (
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
                {/* eslint-disable-next-line no-underscore-dangle */}
                {account._count.merch}
              </td>
              <td>
                {account.Privilege === 'ADMIN' ? (
                  <Button
                    variant="warning"
                    size="sm"
                    disabled={account.AccountID === userId}
                    onClick={() => handlePrivilegeToggle(account)}
                  >
                    Demote
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={account.AccountID === userId}
                    onClick={() => handlePrivilegeToggle(account)}
                  >
                    Promote
                  </Button>
                )}
              </td>
              <td>

                <Button
                  variant="danger"
                  size="sm"
                  disabled={account.AccountID === userId}
                  onClick={() => handleDeleteClick(account)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Toast for confirmation */}
      <ToastContainer position="top-center" className="p-3">
        <Toast show={showToastDelete} onClose={() => setShowToastDelete(false)}>
          <Toast.Header>
            <strong className="me-auto">Confirm Delete</strong>
          </Toast.Header>
          <Toast.Body>
            Are you sure you want to delete
            {' '}
            {selectedAccount?.Username}
            ?&nbsp;
            <Button
              variant="danger"
              size="sm"
              onClick={confirmDelete}
            >
              Yes, Delete
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="ms-2"
              onClick={() => setShowToastDelete(false)}
            >
              Cancel
            </Button>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
