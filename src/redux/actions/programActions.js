import axios from 'axios'
import { FormCheck } from 'react-bootstrap'
import {
  PROGRAM_GET_REQUEST,
  PROGRAM_GET_SUCCESS,
  PROGRAM_GET_FAIL,
  PROGRAM_GET_SEARCH,
} from '../constants/programConstants'

export const listProgram = () => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_GET_REQUEST })
    const { data } = await axios.get(
      'https://mentorkart.org/api/sso-courses' 
    )
    console.log(`${process.env.REACT_APP_WEBSITE_URL}`)
    console.log(data)
    dispatch({
      type: PROGRAM_GET_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: PROGRAM_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const filterProgram = (chec) => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_GET_REQUEST })
    console.log(chec.toString(), 'chec.toString')
    const { data } = await axios.get(
      `${process.env.REACT_APP_WEBSITE_URL}/api/sso-courses`
    )
    const fil = data.data
    console.log('DATA', fil);
    let d = chec
      .map((g) =>
        fil.filter((x) => 
          Object.values(x).join(',').toLowerCase().includes(g.toLowerCase())
        ))
      .flat()

    // eslint-disable-next-line array-callback-return
    let p = chec.map(x => {
        const j = x.split(' ');
        console.log('j', j);
        if(j.length>=2 && j[1]==='Months')
          return j[0];
    })
console.log('p', p);
    if(p){
    d = fil.filter((x) => {

      const d1  = new Date(x['from_date']);
      const d2 = new Date(x['to_date']);
      console.log(d1 ,d2, 'd1, d2')
      const computedMonths = Math.ceil(((d2 - d1)/(1000*60*60*24))/30)
      console.log(computedMonths);
      // console.log('final sorted',d);
      console.log('just checkkinnggg',computedMonths <= Number(p));
      return computedMonths <= Number(p);
    })
  }
  console.log('d', d);
    
    dispatch({
      type: PROGRAM_GET_SUCCESS,
      payload: d,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: PROGRAM_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const listStudentCourse = () => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_GET_REQUEST })
    const { data } = await axios.get(
      `${process.env.REACT_APP_WEBSITE_URL}/api/sso-courses`
    )
    const fil = data.data
    const std = fil.filter((x) =>
      x.user_category.split(',').includes('STUDENT')
    )

    dispatch({
      type: PROGRAM_GET_SUCCESS,
      payload: std,
    })
  } catch (error) {
    dispatch({
      type: PROGRAM_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const listProfessionalCourse = () => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_GET_REQUEST })
    const { data } = await axios.get(
      `${process.env.REACT_APP_WEBSITE_URL}/api/sso-courses`
    )
    const fil = data.data
    const std = fil.filter((x) =>
      x.user_category.split(',').includes('PROFESSIONAL')
    )

    dispatch({
      type: PROGRAM_GET_SUCCESS,
      payload: std,
    })
  } catch (error) {
    dispatch({
      type: PROGRAM_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const listEntrepreneurCourse = () => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_GET_REQUEST })
    const { data } = await axios.get(
      `${process.env.REACT_APP_WEBSITE_URL}/api/sso-courses`
    )
    const fil = data.data
    const std = fil.filter((x) =>
      x.user_category.split(',').includes('ENTREPRENEUR')
    )

    dispatch({
      type: PROGRAM_GET_SUCCESS,
      payload: std,
    })
  } catch (error) {
    dispatch({
      type: PROGRAM_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const searchProgram = (query) => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_GET_REQUEST })
    const { data } = await axios.get(
      `${process.env.REACT_APP_WEBSITE_URL}/api/sso-courses`
    );
    const fil = data.data
    const std = fil.filter((x) => {
      if (x.LMS_course_name) {
        return x.LMS_course_name.toLowerCase().includes(query.toLowerCase());
      }
      if (x.mk_course_name) {
        return x.mk_course_name.toLowerCase().includes(query.toLowerCase());
      }
      if (x.description) {
        return x.description.toLowerCase().includes(query.toLowerCase());
      }
      if (x.course_type) {
        return x.course_type.toLowerCase().includes(query.toLowerCase());
      }
      return x.user_category;
    });

    // console.log(std);
    dispatch({
      type: PROGRAM_GET_SEARCH,
      payload: std,
    });
  } catch (error) {
    dispatch({
      type: PROGRAM_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
