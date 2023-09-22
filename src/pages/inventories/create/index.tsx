import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createInventory } from 'apiSdk/inventories';
import { inventoryValidationSchema } from 'validationSchema/inventories';
import { ProductInterface } from 'interfaces/product';
import { BusinessInterface } from 'interfaces/business';
import { getProducts } from 'apiSdk/products';
import { getBusinesses } from 'apiSdk/businesses';
import { InventoryInterface } from 'interfaces/inventory';

function InventoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InventoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInventory(values);
      resetForm();
      router.push('/inventories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InventoryInterface>({
    initialValues: {
      quantity: 0,
      last_updated: new Date(new Date().toDateString()),
      product_id: (router.query.product_id as string) ?? null,
      business_id: (router.query.business_id as string) ?? null,
    },
    validationSchema: inventoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Inventories',
              link: '/inventories',
            },
            {
              label: 'Create Inventory',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Inventory
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Quantity"
            formControlProps={{
              id: 'quantity',
              isInvalid: !!formik.errors?.quantity,
            }}
            name="quantity"
            error={formik.errors?.quantity}
            value={formik.values?.quantity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="last_updated" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Updated
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_updated ? new Date(formik.values?.last_updated) : null}
              onChange={(value: Date) => formik.setFieldValue('last_updated', value)}
            />
          </FormControl>
          <AsyncSelect<ProductInterface>
            formik={formik}
            name={'product_id'}
            label={'Select Product'}
            placeholder={'Select Product'}
            fetcher={getProducts}
            labelField={'name'}
          />
          <AsyncSelect<BusinessInterface>
            formik={formik}
            name={'business_id'}
            label={'Select Business'}
            placeholder={'Select Business'}
            fetcher={getBusinesses}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/inventories')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'inventory',
    operation: AccessOperationEnum.CREATE,
  }),
)(InventoryCreatePage);
