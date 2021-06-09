import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import {
  FileCopy as FileCopyIcon,
  Refresh as RefreshIcon
} from "@material-ui/icons";

import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 500,
    maxWidth: 500,
    minHeight: 100
  },
  content: {
    fontSize: "1rem"
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: "15px"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between"
  },
  quoteCopiedMessage: {
    color: "green",
    fontSize: "13px",
    marginLeft: "10px"
  }
}));

function QuoteCard() {
  const classes = useStyles();
  const [quote, setQuote] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteCopied, setQuoteCopied] = useState(false);

  async function fetchRandomQuote() {
    try {
      setLoadingQuote(true);
      setErrorMessage("");
      setQuoteCopied(false);
      const quoteObject = await axios.get("https://api.kanye.rest/");
      setQuote(quoteObject.data);
      setLoadingQuote(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoadingQuote(false);
    }
  }

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  function copyQuote() {
    navigator.clipboard.writeText(quote.quote);
    setQuoteCopied(true);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        {loadingQuote ? (
          <div>
            <Skeleton height={80} width={"38vw"} animation="wave" />
            <Skeleton height={30} width={"20vw"} animation="wave" />
          </div>
        ) : quote.quote ? (
          <div>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.quote}
              align="center"
            >
              {quote.quote}
            </Typography>
          </div>
        ) : (
          <p className={classes.errorMessage}>{errorMessage}</p>
        )}
      </CardContent>
      <CardActions disableSpacing className={classes.footer}>
        <div>
          {quoteCopied ? (
            <p className={classes.quoteCopiedMessage}>
              Quote copied to clipboard
            </p>
          ) : (
            <IconButton aria-label="copy-icon" onClick={copyQuote}>
              <FileCopyIcon />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton aria-label="copy-icon" onClick={fetchRandomQuote}>
            <RefreshIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

export default QuoteCard;
