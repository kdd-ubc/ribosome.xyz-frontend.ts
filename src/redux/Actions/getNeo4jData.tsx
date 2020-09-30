import Axios from "axios";
const BACKEND: any = process.env.REACT_APP_DJANGO_URL;
type DjangoAPIs = "neo4j" | "admin" | "pdb";

type Neo4jEndpoints =
  | getStructure
  | getAllStructures
  | getHomologs
  | listAvailableRPs
  | customCypher
  | gmoNomClass
  | gmoLigandClass
  | getAllLigands
  // this is a "PDB endpoint" strictly speaking
  | downloadSubchain;

interface getStructure {
  endpoint: "get_struct";
  params: {
    pdbid: string;
  };
}
interface getHomologs {
  endpoint: "get_homologs";
  params: {
    banName: string;
  };
}
interface customCypher {
  endpoint: "cypher";
  params: {
    cypher: string;
  };
}
interface getAllStructures {
  endpoint: "get_all_structs";
  params: null;
}
interface downloadSubchain {
  endpoint: "get_pdbsubchain";
  params: {
    chainid: string;
    structid: string;
  };
}
interface listAvailableRPs {
  endpoint: "list_available_rps";
  params: null;
}
interface gmoNomClass {
  endpoint: "gmo_nom_class";
  params: {
    banName: string;
  };
}
interface gmoLigandClass {
  endpoint: "gmo_ligand_class";
  params: {
    chemicalId: string;
  };
}
interface getAllLigands{
  endpoint: 'get_all_ligands',
  params: null
}

export const getNeo4jData = (api: DjangoAPIs, ep: Neo4jEndpoints) => {
  const URI = encodeURI(`${BACKEND}/${api}/${ep.endpoint}/`);
  return typeof ep.params != null
    ? Axios.get(URI, { params: ep.params })
    : Axios.get(URI);
};
