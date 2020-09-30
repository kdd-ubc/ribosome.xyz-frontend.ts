import React, { useEffect, useState, createContext, Children } from "react";
import "./RPPage.css";
import { useParams, Link } from "react-router-dom";
import { flattenDeep } from "lodash";
import { RibosomalProtein } from "../../../redux/RibosomeTypes";
import RibosomalProteinHero from "./RibosomalProteinHero";
import { getNeo4jData } from "../../../redux/Actions/getNeo4jData";
import { PageContext } from "../../Main";
import * as ribt from "./../../../redux/RibosomeTypes";
import Axios from "axios";

interface NeoHomolog {
  parent: string;
  protein: RibosomalProtein;
}

const RPPage = () => {
  var params: any = useParams();
  const [homologs, sethomologs] = useState<NeoHomolog[]>([]);

  useEffect(() => {
    var banName = params.nom;

    getNeo4jData("neo4j", {
                endpoint: "gmo_nom_class",
                params: {
                  banName:banName
                },
              }).then(
      r => {
        
        var flattened: NeoHomolog[] = flattenDeep(r.data);
        console.log(
         flattened
        );
        sethomologs(flattened);

      },
      e => {
        console.log("Got error on /neo request", e);
      }
    );

    return () => {};
  }, [params]);

  return params!.nom ? (
    <PageContext.Provider value="RibosomalProteinPage">
      <div className="rp-page">
        <h1>{params.nom}</h1>
        <h4>Homologs</h4>
        <ul className="rp-homologs">
          {homologs.map((e: NeoHomolog) => {
            return (
              <div style={{ display: "flex" }}>
                <RibosomalProteinHero {...e.protein} pdbid={e.parent} />{" "}
                <Link
                  style={{ width: "min-content" }}
                  to={`/catalogue/${e.parent}`}
                >
                  <div>{e.parent}</div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </PageContext.Provider>
  ) : (
    <div>"Fetching..."</div>
  );
};

export default RPPage;
