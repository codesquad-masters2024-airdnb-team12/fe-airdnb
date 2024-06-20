import { writable } from 'svelte/store';
import { getApi } from '../service/api.js';

function setAccommodations() {
    let initValues = {
        totalElements: 0,
        content: [],
        currentPage: 1,
        totalPages: 1
    };

    const { subscribe, update } = writable({ ...initValues });

    const fetchAccommodations = async ({ page = 1, size = 50, sort = 'createdAt.DESC' } = {}) => {
        try {
            const params = new URLSearchParams();

            params.append('page', String(page));
            params.append('size', String(size));
            params.append('sort', sort);

            const options = {
                path: `/accommodations?${params.toString()}`,
            };

            const getDatas = await getApi(options);

            const newData = {
                totalElements: getDatas.totalElements,
                currentPage: getDatas.currentPage,
                totalPages: getDatas.totalPages,
                content: getDatas.content
            };

            update(datas => {
                datas.totalElements = newData.totalElements
                datas.content = [...newData.content]
                datas.currentPage = newData.currentPage;
                datas.totalPages = newData.totalPages;

                return datas
            })
        } catch (err) {
            throw err;
        }
    };

    const fetchAccommodationDetail = async (accommodationId) => {
        try {
            const options = {
                path: '/accommodations/' + accommodationId,
            };

            const getDatas = await getApi(options);
            return getDatas;
        } catch (error) {
            throw error;
        }
    };

    return {
        subscribe,
        fetchAccommodations,
        fetchAccommodationDetail
    };
}

export const accommodations = setAccommodations();
