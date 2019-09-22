import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../auth/withAuthorization';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/firebase';

import { Table, TableBody, TableCell, TableHead, TableRow, Box, Paper, Typography  } from '@material-ui/core';
import { Face } from '@material-ui/icons';


const HomePage = ({ authUser }) => {
  const [values, loading, error] = useCollectionData(
    db.collection('candidatas'),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  if(error || loading) return null
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="main"
      >
        <Box maxWidth="sm">
          <Box display="flex" alignItems="center" justifyContent="space-between" style={{ padding: '1em' }}>
            <Typography variant="subtitle1">Nuevas candidatas</Typography>
            <input type="text"/>
          </Box>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Edad</TableCell>
                  <TableCell>Código postal</TableCell>
                  <TableCell align="right">Fecha de nacimiento</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {values && values.map((props, i) => {
                  return (
                    <Candidata {...props} key={i} />
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

HomePage.propTypes = {
  authUser: PropTypes.object.isRequired,
};



const Candidata = ({nombre, email, edad, codigoPostal, fechaDeNacimiento}) => {
  return (
    <TableRow>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Face style={{ marginRight: '.5em' }} />
          {nombre}
        </Box>
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{edad}</TableCell>
      <TableCell>{codigoPostal}</TableCell>
      <TableCell align="right">{fechaDeNacimiento}</TableCell>
    </TableRow>
  )
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
