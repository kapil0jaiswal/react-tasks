import React, { useState } from "react";

const TreeData = {
  title: "hierarichial tree",
  author: "kapil",
  child: [
    {
      id: 1,
      text: "A",
      css: "center",
      children: [
        { id: 2, text: "b", css: "left", children: [] },
        {
          id: 3,
          text: "c",
          css: "right",
          children: [
            {
              id: 4,
              text: "d",
              css: "left",
              children: [
                      {
                        id: 5,
                        text: "f",
                        css: "left",
                        children: [
                                    {
                                      id: 10,
                                      text: "j",
                                      css: "left",
                                      children: [],
                                    },
                                    {
                                      id: 11,
                                      text: "k",
                                      css: "right",
                                      children: [],
                                    }
                                   ]
                      },
                      {
                        id: 7,
                        text: "g",
                        css: "right",
                        children: [
                          {
                      id: 12,
                      text: "l",
                      css: "left",
                      children: [],
                    },
                    {
                      id: 13,
                      text: "m",
                      css: "right",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: 6,
              text: "e",
              css: "right",
              children: [
                {
                  id: 8,
                  text: "h",
                  css: "left",
                  children: [],
                },
                {
                  id: 9,
                  text: "i",
                  css: "right",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function Tree() {
  function Comment({ data }) {
    const nesteddata = (data.children || []).map((data) => {
      return <Comment key={data.id} data={data} type="child" />;
    });

    const classn = `${data.text}`;
    const cln = `collapse ${data.text}`;
    const collapse = `collapse${data.id}`;
    const target = "#" + collapse;
    const css = `btn btn-primary nestbtn ${data.css} ${data.text}`
    console.log(collapse + " " + target + "" + classn);

    return (
      <div >
        <div className="rooty">
          {" "}
          <button
            className={css}
            type="button"
            data-toggle="collapse"
            data-target={target}
            aria-expanded="false"
            aria-controls={collapse}
          >
            {data.text}
          </button>
        </div>
        <div className={cln} id={collapse}>
          <div className="nested"> {nesteddata}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid  rootx">
      {TreeData.child.map((data) => {
        return <Comment key={data.id} data={data} />;
      })}
    </div>
  );
}

export default Tree;
