/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import clsx from 'clsx';

const TextWrapper = styled('span')(
  ({ theme }) => `
      display: inline-block;
      align-items: center;

      &.flexItem {
        display: inline-flex;
      }
      
      &.MuiText {

        &-black {
          color: ${theme.palette.common.black}
        }

        &-primary {
          color: ${theme.palette.primary.main}
        }
        
        &-secondary {
          color: ${theme.palette.secondary.main}
        }
        
        &-success {
          color: ${theme.palette.success.main}
        }
        
        &-warning {
          color: ${theme.palette.warning.main}
        }
              
        &-error {
          color: ${theme.palette.error.main}
        }
        
        &-info {
          color: ${theme.palette.info.main}
        }
      }
`
);

const Text = ({ className, color = 'secondary', flex, children, ...rest }) => (
  <TextWrapper
    className={clsx(`MuiText-${color}`, { flexItem: flex })}
    {...rest}
  >
    {children}
  </TextWrapper>
);

Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  flex: PropTypes.bool.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'warning',
    'success',
    'info',
    'black',
  ]),
};

export default Text;
