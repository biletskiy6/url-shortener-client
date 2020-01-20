import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%"
    }
  },
  enterLink: {
    marginTop: "30px"
  }
}));

export default function EnterLink() {
  const classes = useStyles();
  const history = useHistory();
  const { request } = useHttp();
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  const urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const onSubmitHandler = async ({ link }) => {
    try {
      const response = await request("/link/generate", "POST", { from: link });
      console.log(response);
      const linkFromDb = response.data.link;
      history.push(`/link/${linkFromDb._id}`);
    } catch (error) {}
  };

  return (
    <div className='enter-link' className={classes.enterLink}>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className={classes.root}
          noValidate
          autoComplete='off'
        >
          <TextField
            id='link'
            name='link'
            error={!!errors.link}
            helperText={errors.link ? "Link format is not correct" : null}
            label='Paste your link'
            inputRef={register({ required: true, pattern: urlPattern })}
          />
        </form>
      </Container>
    </div>
  );
}
