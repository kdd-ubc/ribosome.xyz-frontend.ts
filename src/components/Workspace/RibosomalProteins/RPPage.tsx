import React, { useEffect, useState  } from "react";
import "./RPPage.css";
import { useParams, Link } from "react-router-dom";
import { flattenDeep } from "lodash";
import { RibosomalProtein } from "../../../redux/RibosomeTypes";
import RibosomalProteinHero from "./RibosomalProteinHero";
import { getNeo4jData } from "../../../redux/Actions/getNeo4jData";
import { PageContext } from "../../Main";

interface NeoHomolog {
  parent : string;
  orgname: string[]
  orgid  : number[]
  protein: RibosomalProtein;
  title: string
}

const truncate = (str:string) =>{
    return str.length > 40 ? str.substring(0, 30) + "..." : str;
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


  }, [params]);


  return params!.nom ? (
    <PageContext.Provider value="RibosomalProteinPage">

    <h1>Ribosomal Proteins</h1>
      <div className="rp-page">
        <h1>{params.nom}</h1>
          {homologs.map((e: NeoHomolog) => {
            return (
              <div className="homolog-hero" style={{ display: "flex" }}>
                <RibosomalProteinHero data={e.protein} pdbid={e.parent} />{" "}

                <div className="homolog-struct">
                  <div id='homolog-struct-title'>
                    <Link
                      style={{ width: "min-content" }}
                      to={`/catalogue/${e.parent}`}
                    >
                      <h4>{e.parent}</h4>
                    </Link>{" "}
                    <p> {e.title}</p>
                  </div>
                  {
                    e.orgname.map(
                      ( org,i ) =>
                  <span id='homolog-tax-span'>{truncate( e.orgname[i] )}( ID: {e.orgid[i]} )</span>
                    )
                  }
                  
                </div>
              </div>
            );
          })}

      </div>
    </PageContext.Provider>
  ) : (
    <div>"Fetching..."</div>
  );
};

export default RPPage;
