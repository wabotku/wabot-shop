import React from "react";
import ReactDOM from "react-dom";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import styled from "styled-components";
import CheckIcon from "@material-ui/icons/Check";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Rbac from "@build-security/react-rbac-ui-manager";
import JSONViewer from "./viewer";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4994E4",
      light: "#3C74C3"
    },
    info: {
      main: "#D6EBFF"
    },
    text: {
      primary: "#363C44"
    }
  },
  overrides: {
    MuiTableCell: {
      root: {
        fontSize: "14px",
        padding: "5px 15px",
        borderBottom: 0
      }
    }
  }
});

const data = {
  _roles: {
    user: {
      permissions: []
    },
    admin: {
      permissions: []
    },
    "super admin": {
      permissions: []
    }
  },
  _resources: {
    users: {
      name: "Users",
      _resources: {
        "users.create": {
          name: "create",
          _resources: {}
        },
        "users.delete": {
          name: "delete",
          _resources: {}
        },
        "users.read": {
          name: "read",
          _resources: {}
        },
        "users.update": {
          name: "update",
          _resources: {}
        }
      }
    },
    groups: {
      name: "Groups",
      _resources: {
        "groups.view": {
          name: "view",
          _resources: {}
        },
        "groups.manage": {
          name: "manage",
          _resources: {}
        }
      }
    },
    documents: {
      name: "Documents",
      _resources: {
        "documents.upload": {
          name: "upload",
          _resources: {}
        },
        "documents.create": {
          name: "create",
          _resources: {}
        },
        "documents.share": {
          name: "share",
          _resources: {}
        },
        "documents.managesharing": {
          name: "manage sharing",
          _resources: {}
        }
      }
    },
    policies: {
      name: "Policies",
      _resources: {
        "policies.create": {
          name: "create",
          _resources: {}
        },
        "policies.read": {
          name: "read",
          _resources: {}
        }
      }
    },
    gates: {
      name: "Gates",
      _resources: {
        "gates.control": {
          name: "control",
          _resources: {}
        },
        "gates.open": {
          name: "open",
          _resources: {}
        }
      }
    }
  }
};

const colorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700]
    }
  }
}))(Button);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colorButtonWithIcon = (props: any) => {
  const Button = colorButton;
  return (
    <Button onClick={props.onClick}>
      <CheckIcon />
    </Button>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addIcon = styled(AddCircleOutlineIcon)`
  background: red;
  color: black;

  &.MuiSvgIcon-colorError {
    color: black;
  }
`;

const App = () => {
  const [rbacData, setRbacData] = React.useState(data);

  const handleChange = (value: any) => {
    setRbacData(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Rbac
        defaultValue={data}
        onChange={handleChange}
        buttons={{
          // cancelButton: colorButtonWithIcon,
          // closeButton: colorButton,
          saveButton: colorButton
          // deleteButton: colorButtonWithIcon,
        }}
        // icons={{
        //     editIcon: colorButton,
        //     deleteIcon: colorButton,
        //     treeNodeIcon: addIcon,
        //     treeParentIcon: addIcon,
        //     treeCollapseIcon: addIcon,
        //     treeExpandIcon: addIcon,
        // }}
        // components={{
        //     addResource: () => { return <>Test</> },
        //     addRole: () => { return <>Test 1</> },
        //     roleTag: (props) => { return <>{props.children}</> }
        // }}
      />
      <JSONViewer data={rbacData} />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
