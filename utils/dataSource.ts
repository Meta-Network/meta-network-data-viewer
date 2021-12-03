import { useContext } from "react";
import React from "react";
import { MetadataPlatform } from './types';

const DataSourceContext = React.createContext<{ platform: MetadataPlatform, source: string }>({ platform: null, source: '' });

export default DataSourceContext;