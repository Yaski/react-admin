import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Labeled from '../input/Labeled';

const styles = {
    root: { padding: '0 1em 1em 1em' },
};

const sanitizeRestProps = ({
    children,
    className,
    classes,
    record,
    resource,
    basePath,
    version,
    initialValues,
    translate,
    ...rest
}) => rest;

/**
 * Simple Layout for a Show view, showing fields in one column.
 * 
 * Receives the current `record` from the parent `<Show>` component,
 * and passes it to its childen. Children should be Field-like components.
 *
 * @example     
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *     
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *     
 *     import { PostShow } from './posts';
 *     
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
export const SimpleShowLayout = ({
    basePath,
    className,
    children,
    classes,
    record,
    resource,
    version,
    ...rest
}) => (
    <div
        className={classnames(classes.root, className)}
        key={version}
        {...sanitizeRestProps(rest)}
    >
        {Children.map(
            children,
            field =>
                field ? (
                    <div
                        key={field.props.source}
                        className={classnames(
                            `ra-field ra-field-${field.props.source}`,
                            field.props.className
                        )}
                    >
                        {field.props.addLabel ? (
                            <Labeled
                                record={record}
                                resource={resource}
                                basePath={basePath}
                                label={field.props.label}
                                source={field.props.source}
                                disabled={false}
                            >
                                {field}
                            </Labeled>
                        ) : typeof field.type === 'string' ? (
                            field
                        ) : (
                            React.cloneElement(field, {
                                record,
                                resource,
                                basePath,
                            })
                        )}
                    </div>
                ) : null
        )}
    </div>
);

SimpleShowLayout.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    version: PropTypes.number,
};

export default withStyles(styles)(SimpleShowLayout);
