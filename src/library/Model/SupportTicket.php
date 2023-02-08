<?php
/**
 * FOSSBilling
 *
 * @copyright FOSSBilling (https://www.fossbilling.org)
 * @license   Apache-2.0
 *
 * This file may contain code previously used in the BoxBilling project.
 * Copyright BoxBilling, Inc 2011-2021
 *
 * This source file is subject to the Apache-2.0 License that is bundled
 * with this source code in the file LICENSE
 */


class Model_SupportTicket extends FOSSBilling_Model
{
    const OPENED = 'open';
    const ONHOLD = 'on_hold';
    const CLOSED = 'closed';

    const REL_TYPE_ORDER   = 'order';

    const REL_STATUS_PENDING        = 'pending';
    const REL_STATUS_COMPLETE       = 'complete';
    
    const REL_TASK_CANCEL   = 'cancel';
    const REL_TASK_UPGRADE  = 'upgrade';
}