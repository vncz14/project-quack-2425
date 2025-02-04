"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Editable } from "./Editable";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useReducer, useEffect, useRef } from "react";
import { get_user_info } from "./get_user_info";
import Cookies from "js-cookie";

type for_account_info_type = {
  name: string;
  obj_key: string;
  value: string;
  input_type?: string;
};
const PATCH_USER_ENDPOINT = async (partial) => {
  // https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html#:~:text=/dj%2Drest%2Dauth/user/%20(GET%2C%20PUT%2C%20PATCH)
  fetch(`http://localhost:8000/dj-rest-auth/user`, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${Cookies.get("csrftoken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partial),
  });
};
export default function Page() {
  const isMounted = useRef(false);
  const reducer = (state, action) => {
    switch (action.type) {
      case "INITIAL": {
        return { ...action.payload };
      }
      case "EDIT_EMAIL": {
        const partial = { email: action.payload };
        return { ...state, ...partial };
      }
      case "EDIT_FIRST_NAME": {
        const partial = { first_name: action.payload };
        PATCH_USER_ENDPOINT(partial);
        return { ...state, ...partial };
      }
      case "EDIT_LAST_NAME": {
        const partial = { last_name: action.payload };
        PATCH_USER_ENDPOINT(partial);
        return { ...state, ...partial };
      }
      case "EDIT_USERNAME": {
        const partial = { username: action.payload };
        PATCH_USER_ENDPOINT(partial);
        return { ...state, ...partial };
      }
      case "EDIT_PASSWORD": {
        const partial = { password: action.payload };
        return { ...state, ...partial };
      }
    }
  };
  const [user, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    if (!isMounted.current) {
      (async () => {
        const user = await get_user_info();
        dispatch({ type: "INITIAL", payload: user });
      })();
      isMounted.current = true;
    } else if (user !== null) {
      Cookies.set("user", JSON.stringify(user));
    }
  }, [user]);

  if (!user) return <>Loading</>;
  const for_account_info: for_account_info_type = [
    { name: "First Name", obj_key: "first_name", value: user.first_name },
    { name: "Last Name", obj_key: "last_name", value: user.last_name },
    { name: "Username", obj_key: "username", value: user.username },
    { name: "Email", obj_key: "email", value: user.email },
  ];
  console.log(user);
  console.log(for_account_info);
  return (
    <div className="max-w-[30rem]">
      <Text as="h1" className="text-red-500">
        Under Construction
      </Text>
      <div>
        <Text as="h2">Personal Information</Text>
        <ul>
          {for_account_info.map((part) => (
            <Editable
              key={part.name}
              name={part.name}
              input_type={part?.type ? part.type : "text"}
              obj_key={part.obj_key}
              value={part.value}
              dispatch={dispatch}
            />
          ))}
          <li>Phone Number: [Need to implement in database still]</li>
        </ul>
      </div>
      <div>
        <Text as="h2">Login Methods</Text>
        <ul>
          {/* <Editable name="Password" value="⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆" /> */}
          <li>Enable 2auth email:</li>
        </ul>
      </div>
      <div>
        <Text as="h2">Personal</Text>
        <ul>
          <li>Birthday:</li>
          <li>Gender (Optional):</li>
          <li>Theme:</li>
        </ul>
      </div>
      <div>
        <Text as="h2">Social Networks</Text>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="my_instagram">Instagram</Label>
          <Input type="url" id="my_instagram" placeholder="instagram" />
        </div>
      </div>
      <div>
        <Text as="h2">Social Networks Visibility</Text>
        <p>Who can see links to your social networks profile</p>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Everyone</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">
              Friends, followers & people I follow
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Friends & people I follow</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">No one</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
