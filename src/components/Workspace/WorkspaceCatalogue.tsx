import React, { useEffect } from "react";
import "./WorkspaceCatalogue.css";
import { structs_kdd2019 } from "./../../static/kdd-paper-table";
import { connect } from "react-redux";
import {
  WorkspaceState,
  toggleWorkspaceSelected,
  loadUpWorkspaceStructures,
} from "../../redux/reducers/workspaceCatalogueReducer";
import { Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../types/action.types";
import { AppState } from "../../redux/store";

const StructModal = ({
  pdbid,
  select,
}: {
  pdbid: string;
  select: (pdbid: string) => void;
}) => {
  return (
    <div
      onClick={() => select(pdbid)}
      className="struct-modal"
      id={`_struct_${pdbid}`}
    >
      {pdbid}
    </div>
  );
};

interface OwnProps {}
interface StateProps {
  catalogueAvailable: Array<string>;
  catalogueSelected: Array<string>;
}
interface ActionProps {
  toggleSelected: (pdbid: string) => void;
  loadUp: (structs: string[]) => void;
}

type WorkspaceProps = ActionProps & OwnProps & StateProps;

const WorkspaceCatalogue: React.FC<WorkspaceProps> = props => {
  useEffect(() => {
    props.loadUp(Object.keys(structs_kdd2019));
  }, []);

  return (
    <div className="workspace-catalogue">
      <div className="workspace-available">
        {props.catalogueAvailable.map((e: string) => {
          return <StructModal select={props.toggleSelected} pdbid={e} />;
        })}
      </div>
      <div className="workspace-selected">
        {props.catalogueSelected.map((e: string) => {
          return <StructModal select={props.toggleSelected} pdbid={e} />;
        })}
      </div>
    </div>
  );
};

const mapState = (state: AppState, OwnProps: OwnProps): WorkspaceState => ({
  catalogueAvailable:
    state.store_ui.state_WorkspaceCatalogue.catalogueAvailable,
  catalogueSelected: state.store_ui.state_WorkspaceCatalogue.catalogueSelected,
});

const mapDispatch = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownprops: OwnProps
): ActionProps => ({
  toggleSelected: (pdbid: string) => dispatch(toggleWorkspaceSelected(pdbid)),
  loadUp: (structures: string[]) =>
    dispatch(loadUpWorkspaceStructures(structures)),
});

export default connect(mapState, mapDispatch)(WorkspaceCatalogue);
