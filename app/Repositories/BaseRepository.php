<?php

namespace App\Repositories;

use App\Repositories\Interfaces\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\JsonResponse;

abstract class BaseRepository implements EloquentRepositoryInterface
{
    protected Model $model;

    public function all(array $relations = [])
    {
        return $this->model->with($relations)->get();
    }

    /**
     * Get all soft deleted records
     *
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Collection
     */

    public function allTrashed(array $relations = [])
    {
        return $this->model->onlyTrashed()->with($relations)->get();
    }

    public function find($id, array $relations = [])
    {
        return $this->model->with($relations)->findOrFail($id);
    }

    public function findTrashed($id, array $relations = [])
    {
        return $this->model->onlyTrashed()->with($relations)->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $record = $this->find($id);
        $record->update($data);
        return $record;
    }

    public function delete($id)
    {
        return $this->find($id)->delete();
    }

    public function getDeleted()
    {
        return $this->model->onlyTrashed()->whereNotNull('deleted-at')->get();
    }

    public function restore($id)
    {
        $dataTrashed = $this->model->withTrashed()->find($id);

        if ($dataTrashed && $dataTrashed->trashed()) {
            $dataTrashed->restore();
            return $dataTrashed;
        }
    }

    public function forceDelete($id)
    {
        $dataTrashed = $this->model->withTrashed()->find($id);

        if ($dataTrashed) {
            $dataTrashed->forceDelete();
        }
        return null;
    }

    public function sendResponse($result, $message, $code = 200): JsonResponse
    {
        $response = [
            'success' => true,
            'data' => $result,
            'message' => $message,
        ];

        return response()->json($response, $code);
    }

    /**
     * Error response method.
     */
    public function sendError($error, $errorMessages = [], $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['errors'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}
