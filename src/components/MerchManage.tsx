'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { Merch, MerchStockStatus } from '@prisma/client';
import { deleteMerchByID, updateMerchStockStatus } from '@/lib/dbActions';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const statusColorMap: Record<MerchStockStatus, string> = {
  ON_STOCK: 'bg-wonkes-6',
  RECALLED: 'bg-warning',
  SOLD: 'bg-info',
};

const statusLabelMap: Record<MerchStockStatus, string> = {
  ON_STOCK: 'ON STOCK',
  RECALLED: 'RECALLED',
  SOLD: 'SOLD',
};

const handleDelete = async (merchID : number, router: AppRouterInstance) => {
  // Confirm delete operation.
  const confirmation = await swal({
    title: 'Delete this merch?',
    text: 'This can not be undone',
    icon: 'warning',
    buttons: {
      cancel: {
        text: 'No, go back',
        visible: true,
      },
      confirm: {
        text: 'Yes, delete it',
        visible: true,
        closeModal: false,
        className: 'swal-button--danger',
      },
    },
    dangerMode: true,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });

  // Cancel delete.
  if (!confirmation) {
    return;
  }

  // Delete merch.
  try {
    const result = await deleteMerchByID(merchID);

    if (result?.deletedMerch) {
      await swal({
        title: 'Deleted',
        text: 'Everything about this merch is deleted',
        icon: 'success',
        timer: 3000,
      });
      router.refresh();
    } else {
      throw new Error('Delete failed');
    }
  } catch (error) {
    console.error(error);

    await swal({
      title: 'Error',
      text: 'Something went wrong while deleting',
      icon: 'error',
    });
  }
};

const MerchManage = ({ merch }: { merch : Merch }) => {
  const router = useRouter();
  const statusColor = statusColorMap[merch.StockStatus] || 'bg-danger';
  const statusLabel = statusLabelMap[merch.StockStatus] || 'ERROR';

  return (
    <Container
      fluid
      className="position-relative"
      style={{ minHeight: '100%' }}
    >
      {/* Stock status ribbon. */}
      <div
        className={`position-absolute text-white px-5 py-2 fw-bold ${statusColor}`}
        style={{
          top: '20px',
          right: '-143px',
          transform: 'rotate(30deg)',
          fontSize: '2.5rem',
          width: '500px',
          textAlign: 'center',
        }}
      >
        {statusLabel}
      </div>

      <Container style={{ minHeight: '305px' }} />

      {/* Button area. */}
      <Row>
        <Col className="text-center">
          <Button
            href={`listings-edit/${merch.MerchID}`}
            variant="warning"
            className="w-100 fw-semibold"
          >
            Edit Merch
          </Button>
        </Col>
      </Row>

      {merch.StockStatus !== 'SOLD' && (
      <Row className="mt-2">
        <Col className="text-center">
          <Button
            variant="info"
            className="w-100 fw-semibold"
            onClick={() => updateMerchStockStatus({ MerchID: merch.MerchID, StockStatus: 'SOLD' })}
          >
            Mark as Sold
          </Button>
        </Col>
      </Row>
      )}

      <Row className="mt-2">
        <Col className="text-center">
          <Button
            variant="danger"
            className="w-100 fw-semibold"
            onClick={() => handleDelete(merch.MerchID, router)}
          >
            Delete Merch
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MerchManage;
