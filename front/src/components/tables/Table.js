import React from "react";
import styled from "@emotion/styled";
import { FaEye, FaPen, FaTrash, FaUserPlus } from "react-icons/fa";
import IconButton from "../../components/buttons/IconButton";
import { Label } from "../Titles";

const Table = ({
  _isAddButton,
  onClickAddButton,
  textAddButton,
  bgColor,
  doEdit,
  doShow,
  doDelete,
  onDelete,
  onEdit,
  onShow,
  headers,
  body,
}) => {
  console.log(body);
  const content = body ? body : [];
  const parseDate = (date) => {
    const newDate = date.substring(0, 10).split("-").reverse().join("-");
    return newDate;
  };
  return (
    <div className="relative">
      {_isAddButton && (
        <div className="absolute -top-14 right-0">
          <IconButton onClick={onClickAddButton} text={textAddButton}>
            <FaUserPlus size={24} />
          </IconButton>
        </div>
      )}

      <TableContainer>
        <Header>
          <TRH>
            {React.Children.toArray(
              headers.map(([head], index) => (
                <TH key={index}>{head === "id" ? "" : head}</TH>
              ))
            )}
            {(doEdit || doDelete || doShow) && <TH>Acciones</TH>}
          </TRH>
        </Header>
        <Body>
          {React.Children.toArray(
            content.map((obj, i) => (
              <TR key={i}>
                {React.Children.toArray(
                  headers.map(([, field], index) => (
                    <TD key={index}>
                      {field === "id" ? (
                        i + 1
                      ) : field === "photo_url" ? (
                        <img
                          style={{ width: 50, height: 50 }}
                          src={obj["photo_url"]}
                          alt="img_vehicle"
                        />
                      ) : field === "created_at" ? (
                        parseDate(obj["created_at"])
                      ) : field === "status" ? (
                        <div>{obj[field] === "1" ? "Activo" : "Inactivo"}</div>
                      ) : (
                        obj[field]
                      )}
                    </TD>
                  ))
                )}
                {(doEdit || doDelete || doShow) && (
                  <TD>
                    <div className="flex gap-3">
                      <Icons bgColor={"#349EFF"}>
                        <FaEye fill="#fff" onClick={onShow} />
                      </Icons>
                      <Icons bgColor={"#019707"}>
                        <FaPen fill="#fff" onClick={() => onEdit(obj["id"])} />
                      </Icons>
                      <Icons bgColor={"#EA5656"}>
                        <FaTrash fill="#fff" onClick={onShow} />
                      </Icons>
                    </div>
                  </TD>
                )}
              </TR>
            ))
          )}
        </Body>
      </TableContainer>
      {content.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-[100%]">
          <img
            src={require("../../assets/img/no_registros.png")}
            width="350px"
            alt="not_registros"
          />
          <div className="w-80 text-center">
            <Label
              size={20}
              color={"#349EFF"}
              text={
                "Parece que se han llevado todo, pero puedes crear un nuevo registro"
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Table;

const Icons = styled.div`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;

const TableContainer = styled.table`
  width: 100%;
  box-shadow: 0px 0px 7px 7px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  margin: 15px 0;
`;
const Header = styled.thead`
  width: 100%;
`;
const Body = styled.tbody`
  width: 100%;
  background-color: #fff;
  /* box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.05); */
`;

const TRH = styled.tr`
  width: 100%;
`;
const TR = styled.tr`
  width: 100%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
const TH = styled.th`
  font-weight: bold;
  padding: 20px;
  background-color: #dcdcdc;
  text-align: left;
  &:first-of-type {
    border-radius: 10px 0 0 10px;
  }
  &:last-of-type {
    border-radius: 0 10px 10px 0;
  }
`;
const TD = styled.td`
  padding: 20px;
`;
